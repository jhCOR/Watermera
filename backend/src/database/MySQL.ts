import RegisterRequest from "../requests/RegisterRequest";
import DataProvider from "./DataProvider";
import mysql from 'mysql2/promise';
import { RegResult } from "../responses/responses/RegistrationResponse";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { LoginResult } from "../responses/responses/LoginResponse";
import LoginRequest from "../requests/LoginRequest";
import GetUserDataResponse, { GetUserDataResult } from "../responses/responses/GetUserDataResponse";
import QualityTestResult from "../types/QualityTestResult";
import { Permission } from "../types/Permission";
import RequestPost, { RequestStatus } from "../types/RequestPost";
import GetTestRequestsResponse, { GetTestRequestsResult } from "../responses/responses/GetTestRequestsResponse";
import PostTestReqRequest from "../requests/PostTestReqRequest";
import PostTestReqResponse, { PostTestReqResult } from "../responses/responses/PostTestReqResponse";

export default class MySQL extends DataProvider{
	conn!: mysql.Connection;
	readonly host: string;
	readonly user: string;
	readonly password: string;
	readonly database: string;
	constructor(host: string, user: string, password: string, database: string){
		super();
		this.host = host;
		this.user = user;
		this.password = password;
		this.database = database;
	}

	async hasPermission(uid: string, permissions: Partial<Permission>): Promise<boolean>{
		const [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>('SELECT canEditRecords, canViewAllRequests, canChangeRequestStatus, canManagePermissions FROM permissions WHERE uid = ? LIMIT 1;', [uid]);
		if(!rows.length) return false;
		if(permissions.canEditRecords && !rows[0].canEditRecords) return false;
		if(permissions.canViewAllRequests && !rows[0].canViewAllRequests) return false;
		if(permissions.canChangeRequestStatus && !rows[0].canChangeRequestStatus) return false;
		if(permissions.canManagePermissions && !rows[0].canManagePermissions) return false;
		return true;
	}

	async createTestRequest(uid: string, req: PostTestReqRequest): Promise<{res: PostTestReqResult.Success, data: PostTestReqResponse['data']}>{
		await this.conn.beginTransaction();
		try{
			const reqid = crypto.randomUUID();
			await this.conn.execute<mysql.OkPacket>(
				`INSERT INTO test_requests
				(reqid, time, location, requestor, status, resid, note)
				VALUES (?, ?, ?, ?, ?, ?, ?)`,
				[reqid, new Date(), req.location, uid, RequestStatus.UnderReview, null, req.note]
			);
			await this.conn.commit();
			return{
				res: PostTestReqResult.Success,
				data: {
					reqid: reqid
				}
			};
		} catch(e){
			await this.conn.rollback();
			throw e;
		}
	}

	async getTestRequests(uid: string): Promise<{res: GetTestRequestsResult.Success, data: GetTestRequestsResponse['data']}>{
		const canViewAllRequests = await this.hasPermission(uid, {canViewAllRequests: true});
		let rows: mysql.RowDataPacket[];
		let fields: mysql.FieldPacket[];
		if(canViewAllRequests) [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>(`SELECT * FROM test_requests;`);
		else [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>(`SELECT * FROM test_requests WHERE requestor = ?;`, [uid]);
		let posts: RequestPost[] = [];
		for(const r of rows){
			posts.push({
				reqid: r.reqid,
				time: new Date(r.time),
				location: r.location,
				requestor: r.requestor,
				status: r.status,
				resid: r.resid ? r.resid : null,
				note: r.note
			});
		}
		return {
			res: GetTestRequestsResult.Success,
			data:{
				allPosts: canViewAllRequests,
				posts: posts
			}
		};
	}

	async addTestResults(uid: string, rows: QualityTestResult[]){
		await this.conn.beginTransaction();
		try{
			for(const r of rows){
				await this.conn.execute<mysql.OkPacket>(``)
			}
		} catch(e){
			await this.conn.rollback();
			throw e;
		}
	}

	async getUserData(uid: string): Promise<{ res: GetUserDataResult, data: GetUserDataResponse['data']}> {
		const [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>('SELECT email, name, dob, phone, address FROM users WHERE uid = ? LIMIT 1;', [uid]);
		const userData = rows[0];
		return{
			res: GetUserDataResult.Success,
			data: {
				uid: uid,
				email: userData.email,
				name: userData.name,
				dob: new Date(userData.dob),
				phone: userData.phone,
				address: userData.address
			}
		}
	}

	async login(req: LoginRequest): Promise<{res: Exclude<LoginResult, LoginResult.Success>} | {res: LoginResult.Success, uid: string}>{
		const [rows, fields] = await this.conn.execute<mysql.RowDataPacket[]>('SELECT hash, uid FROM users WHERE email = ? LIMIT 1;', [req.email]);
		if(rows.length === 0) return {res: LoginResult.NotRegistered};
		if(await bcrypt.compare(req.hash, rows[0].hash)) return {res: LoginResult.Success, uid: rows[0].uid};
		return {res: LoginResult.WrongPassword};
	}

	async register(req: RegisterRequest): Promise<{res: Exclude<RegResult, RegResult.Success | RegResult.Invalid>} | {res: RegResult.Success, uid: string}> {
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
		await this.conn.execute(
			`CREATE TABLE IF NOT EXISTS users (
				uid CHAR(36) PRIMARY KEY,
				email VARCHAR(60),
				hash CHAR(60),
				name VARCHAR(20),
				dob DATE,
				phone CHAR(11),
				address VARCHAR(200)
			);`
		);
		await this.conn.execute(
			`CREATE TABLE IF NOT EXISTS permissions (
				uid CHAR(36) PRIMARY KEY,
				canEditRecords BOOLEAN NOT NULL,
				canViewAllRequests BOOLEAN NOT NULL,
				canChangeRequestStatus BOOLEAN NOT NULL,
				canManagePermissions BOOLEAN NOT NULL,
				FOREIGN KEY (uid) REFERENCES users(uid)
				ON DELETE CASCADE ON UPDATE CASCADE
			);`
		);
		await this.conn.execute(
			`CREATE TABLE IF NOT EXISTS test_results (
				recid CHAR(36) PRIMARY KEY,
				year SMALLINT NOT NULL,
				month TINYINT NOT NULL,
				region VARCHAR(200),
				inst VARCHAR(200)
			);`
		);
		await this.conn.execute(
			`CREATE TABLE IF NOT EXISTS test_requests (
				reqid CHAR(36) PRIMARY KEY,
				time DATE NOT NULL,
				location VARCHAR(200) NOT NULL,
				requestor CHAR(36) NOT NULL,
				status TINYINT NOT NULL,
				resid CHAR(36),
				note BLOB NOT NULL,
				FOREIGN KEY (requestor) REFERENCES users (uid)
				ON DELETE CASCADE ON UPDATE CASCADE
			);`
		);
		return true;
	}
}