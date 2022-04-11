import RegisterRequest from "../requests/RegisterRequest";
import DataProvider from "./DataProvider";
import mysql from 'mysql2/promise';
import { RegResult } from "../responses/responses/RegistrationResponse";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { LoginResult } from "../responses/responses/LoginResponse";
import LoginRequest from "../requests/LoginRequest";

export default class MySQL extends DataProvider{
	conn!: mysql.Connection;
	host: string;
	user: string;
	password: string;
	database: string;
	constructor(host: string, user: string, password: string, database: string){
		super();
		this.host = host;
		this.user = user;
		this.password = password;
		this.database = database;
	}

	async login(req: LoginRequest): Promise<{res: Exclude<LoginResult, LoginResult.Success>} | {res: LoginResult.Success, uid: string}>{
		const [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>('SELECT hash, uid FROM users WHERE email = ? LIMIT 1;', [req.email]);
		if(rows.length === 0) return {res: LoginResult.NotRegistered};
		if(await bcrypt.compare(req.hash, rows[0].hash)) return {res: LoginResult.Success, uid: rows[0].uid};
		return {res: LoginResult.WrongPassword};
	}

	async register(req: RegisterRequest): Promise<{res: RegResult.Registered} | {res: RegResult.Success, uid: string}> {
		await this.conn.beginTransaction();
		const [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>('SELECT EXISTS (SELECT * FROM users WHERE email = ?) AS res;', [req.email]);
		if(rows[0].res !== 0) {
			await this.conn.rollback();
			return {res: RegResult.Registered};
		} else {
			try{
				const uid = crypto.randomUUID();
				const hash = await bcrypt.hash(req.hash, 12);
				await this.conn.execute(`INSERT INTO users (uid, email, hash, name, dob, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)`, [uid, req.email, hash, req.name, req.dob, req.phone, req.address]);
				await this.conn.commit();
				return {res: RegResult.Success, uid: uid};
			} catch(e){
				await this.conn.rollback();
				throw e;
			}
		}
	}

	async init(): Promise<boolean>{
		this.conn = await mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database
		});
		await this.conn.execute('CREATE TABLE IF NOT EXISTS users (uid CHAR(36) PRIMARY KEY, email VARCHAR(60), hash CHAR(60), name VARCHAR(20), dob DATE, phone CHAR(11), address VARCHAR(200));');
		return true;
	}
}