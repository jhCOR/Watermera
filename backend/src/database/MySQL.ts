import RegisterRequest from "../requests/RegisterRequest";
import DataProvider from "./DataProvider";
import mysql from 'mysql2/promise';

export default class MySQL extends DataProvider{
	db: mysql.Connection | null;
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
		this.db = null;
	}
	async register(req: RegisterRequest): Promise<{ res: 1 | 2 | 3; } | { res: 0; uid: string; }> {
		throw new Error("Method not implemented.");
	}
	async init(): Promise<boolean>{
		this.db = await mysql.createConnection({
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database
		});
		this.db.execute('CREATE TABLE IF NOT EXISTS users (uid CHAR(36) PRIMARY KEY, email VARCHAR(60), hash CHAR(60), name VARCHAR(20), dob DATE, phone CHAR(11), address VARCHAR(200));');
		return true;
	}
}