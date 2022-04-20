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
import { UpdateTestReqResult } from "../responses/responses/UpdateTestReqResponse";

export default class MySQL extends DataProvider{
	pool: mysql.Pool;
	constructor(host: string, user: string, password: string, database: string){
		super();
		this.pool = mysql.createPool({
			host: host,
			user: user,
			password: password,
			database: database,
			waitForConnections: true,
			connectionLimit: 10
		});
	}

	async updateTestRequest(uid: string, reqid: string, req: Partial<PostTestReqRequest>): Promise<{ res: UpdateTestReqResult; }> {
		const conn = await this.pool.getConnection();
		await conn.beginTransaction();
		try{
			const canViewAllRequests = await this.hasPermission(uid, {canViewAllRequests: true});
			const [rows, fields] = await conn.execute<mysql.RowDataPacket[]>('SELECT status, requestor FROM test_requests WHERE reqid = ? LIMIT 1;', [reqid]);
			if(rows.length === 0) {
				await conn.rollback();
				conn.release();
				return { res: UpdateTestReqResult.DoesNotExist };
			}
			const targetPost = rows[0];
			if(canViewAllRequests || targetPost.requestor === uid){
				if(targetPost.status !== 0 && targetPost.status !== 6) {
					await conn.rollback();
					return { res: UpdateTestReqResult.AlreadyReviewed };
				} else {
					const newLoc = req.location ? req.location : null;
					const newNote = req.note ? req.note : null;
					await conn.execute<mysql.OkPacket>(
						`UPDATE test_requests
						SET time = ?, location = COALESCE(?, location), status = 0, note = COALESCE(?, note)
						WHERE reqid = ?;`,
						[new Date(), newLoc, newNote, reqid]
					);
					await conn.commit();
					conn.release();
					return { res: UpdateTestReqResult.Success };
				}
			} else {
				await conn.rollback();
				conn.release();
				return { res: UpdateTestReqResult.NotAllowed };
			}
		} catch(e){
			await conn.rollback();
			conn.release();
			throw e;
		}
	}

	async hasPermission(uid: string, permissions: Partial<Permission>): Promise<boolean>{
		const conn = await this.pool.getConnection();
		const [rows, fields] = await conn.execute<mysql.RowDataPacket[]>('SELECT canEditRecords, canViewAllRequests, canChangeRequestStatus, canManagePermissions FROM permissions WHERE uid = ? LIMIT 1;', [uid]);
		if(!rows.length) return false;
		if(permissions.canEditRecords && !rows[0].canEditRecords) return false;
		if(permissions.canViewAllRequests && !rows[0].canViewAllRequests) return false;
		if(permissions.canChangeRequestStatus && !rows[0].canChangeRequestStatus) return false;
		if(permissions.canManagePermissions && !rows[0].canManagePermissions) return false;
		return true;
	}

	async createTestRequest(uid: string, req: PostTestReqRequest): Promise<{res: PostTestReqResult.Success, data: PostTestReqResponse['data']}>{
		const conn = await this.pool.getConnection();
		await conn.beginTransaction();
		try{
			const reqid = crypto.randomUUID();
			await conn.execute<mysql.OkPacket>(
				`INSERT INTO test_requests
				(reqid, time, location, requestor, status, resid, note)
				VALUES (?, ?, ?, ?, ?, ?, ?)`,
				[reqid, new Date(), req.location, uid, RequestStatus.UnderReview, null, req.note]
			);
			await conn.commit();
			conn.release();
			return{
				res: PostTestReqResult.Success,
				data: {
					reqid: reqid
				}
			};
		} catch(e){
			await conn.rollback();
			conn.release();
			throw e;
		}
	}

	async getTestRequests(uid: string): Promise<{res: GetTestRequestsResult.Success, data: GetTestRequestsResponse['data']}>{
		const conn = await this.pool.getConnection();
		const canViewAllRequests = await this.hasPermission(uid, {canViewAllRequests: true});
		let rows: mysql.RowDataPacket[];
		let fields: mysql.FieldPacket[];
		if(canViewAllRequests) [rows, fields] = await conn.execute<mysql.RowDataPacket[]>(`SELECT * FROM test_requests;`);
		else [rows, fields] = await conn.execute<mysql.RowDataPacket[]>(`SELECT * FROM test_requests WHERE requestor = ?;`, [uid]);
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
		const conn = await this.pool.getConnection();
		await conn.beginTransaction();
		try{
			for(const r of rows){
				await conn.execute<mysql.OkPacket>(``)
			}
		} catch(e){
			await conn.rollback();
			throw e;
		}
	}

	async getUserData(uid: string): Promise<{ res: GetUserDataResult, data: GetUserDataResponse['data']}> {
		const conn = await this.pool.getConnection();
		const [rows, fields] = await conn.execute<mysql.RowDataPacket[]>('SELECT email, name, dob, phone, address FROM users WHERE uid = ? LIMIT 1;', [uid]);
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
		const conn = await this.pool.getConnection();
		const [rows, fields] = await conn.execute<mysql.RowDataPacket[]>('SELECT hash, uid FROM users WHERE email = ? LIMIT 1;', [req.email]);
		if(rows.length === 0) return {res: LoginResult.NotRegistered};
		if(await bcrypt.compare(req.hash, rows[0].hash)) return {res: LoginResult.Success, uid: rows[0].uid};
		return {res: LoginResult.WrongPassword};
	}

	async register(req: RegisterRequest): Promise<{res: Exclude<RegResult, RegResult.Success | RegResult.Invalid>} | {res: RegResult.Success, uid: string}> {
		const conn = await this.pool.getConnection();
		const [rows, fields] = await conn.execute<mysql.RowDataPacket[]>('SELECT EXISTS (SELECT * FROM users WHERE email = ?) AS res;', [req.email]);
		if(rows[0].res !== 0) return {res: RegResult.Registered};
		else {
			await conn.beginTransaction();
			try{
				const uid = crypto.randomUUID();
				const hash = await bcrypt.hash(req.hash, 12);
				await conn.execute(`INSERT INTO users (uid, email, hash, name, dob, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)`, [uid, req.email, hash, req.name, req.dob, req.phone, req.address]);
				await conn.commit();
				conn.release();
				return {res: RegResult.Success, uid: uid};
			} catch(e){
				await conn.rollback();
				conn.release();
				throw e;
			}
		}
	}

	async init(): Promise<boolean>{
		const conn = await this.pool.getConnection();
		await conn.execute(
			`CREATE TABLE IF NOT EXISTS users (
				uid CHAR(36) PRIMARY KEY,
				email VARCHAR(60),
				hash CHAR(60),
				name VARCHAR(20),
				dob DATE,
				phone VARCHAR(14),
				address VARCHAR(200)
			);`
		);
		await conn.execute(
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

		await conn.execute(
			`CREATE TABLE IF NOT EXISTS test_requests (
				reqid CHAR(36) PRIMARY KEY,
				time TIMESTAMP NOT NULL,
				location VARCHAR(200) NOT NULL,
				requestor CHAR(36) NOT NULL,
				status TINYINT NOT NULL,
				recid CHAR(36),
				note BLOB NOT NULL,
				FOREIGN KEY (requestor) REFERENCES users (uid)
				ON DELETE CASCADE ON UPDATE CASCADE
			);`
		);
		await conn.execute(
			`CREATE TABLE IF NOT EXISTS test_records (
				recid CHAR(36) PRIMARY KEY,
				year SMALLINT NOT NULL,
				month TINYINT NOT NULL,
				region VARCHAR(50) NOT NULL,
				supplier VARCHAR(50) NOT NULL,
				tap_name VARCHAR(200) NOT NULL,
				category BOOLEAN NOT NULL,
				supply_method TINYINT NOT NULL,
				institution VARCHAR(50) NOT NULL,
				germs SMALLINT NOT NULL,
				total_coliform BOOLEAN NOT NULL,
				nh3 DECIMAL(7, 4) NOT NULL,
				copper DECIMAL(7, 4) NOT NULL,
				zinc DECIMAL(7, 4) NOT NULL,
				chlorine_ion DECIMAL(7, 4) NOT NULL,
				iron DECIMAL(7, 4) NOT NULL,
				manganese DECIMAL(7, 4) NOT NULL,
				residual_chlorine DECIMAL(7, 4) NOT NULL,
				ecoli BOOLEAN NOT NULL
			);`
		);
		conn.release();
		return true;
	}
}