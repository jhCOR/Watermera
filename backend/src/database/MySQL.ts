import RegisterRequest from "../requests/RegisterRequest";
import DataProvider from "./DataProvider";
import mysql from 'mysql2/promise';
import { RegResult } from "../responses/responses/RegistrationResponse";
import crypto from 'crypto';

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
	async register(req: RegisterRequest): Promise<{res: RegResult.Registered} | {res: RegResult.Success, uid: string}> {
		await this.conn.beginTransaction();
		const res = this.conn.execute('SELECT EXISTS (SELECT * FROM users WHERE email = ?) AS res;', [req.email]);
		if(res) return {res: RegResult.Registered};
		else {
			const uid = crypto.randomUUID();
			this.conn.execute(`INSERT INTO users (uid, email, hash, name, dob, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)`, [uid, req.email, req.hash, req.name, req.dob, req.phone, req.address]);
			return {res: RegResult.Success, uid: uid};
		}
	}
	async init(): Promise<boolean>{
		this.conn = await mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database
		});
		this.conn.execute('CREATE TABLE IF NOT EXISTS users (uid CHAR(36) PRIMARY KEY, email VARCHAR(60), hash CHAR(60), name VARCHAR(20), dob DATE, phone CHAR(11), address VARCHAR(200));');
		return true;
	}
}