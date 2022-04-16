import express from "express";
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Handler from "./Handler";
import Middleware from "./Middleware";
import MySQL from "./database/MySQL";

async function main(){
	const configPath = path.resolve('./config/config.json');

	if(!fs.existsSync(configPath)){ //Generate config if it is missing
		fs.writeFileSync(configPath, JSON.stringify({
			jwtKey: Buffer.from(crypto.randomBytes(64)).toString('base64'), //Generate random secet JWT signing key
			allowedOrigins: [],
			port: 8080,
			database: {
				host: '',
				user: '',
				password: '',
				dbname: ''
			}
		}));
		console.log('Config file generated. Please fill in the details, then run the server again.');
		return;
	}

	const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

	const app = express();
	
	const mem = multer({storage: multer.memoryStorage()}); //For file uplod

	const options: cors.CorsOptions = {
		origin: config.allowed,
	};

	const db = new MySQL(config.database.host, config.database.user, config.database.password, config.database.dbname);
	await db.init();

	app.use(cors(options));
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));

	app.set('jwtKey', config.jwtKey);
	app.set('db', db);

	app.get('/user', Middleware.checkToken, Handler.getUserData);
	app.get('/request', Middleware.checkToken, Handler.getTestRequests);

	app.post('/login', Middleware.checkBody(['email', 'hash']), Handler.login); //Login endpoint
	app.post('/request', Middleware.checkToken, Middleware.checkBody(['location', 'note']), Handler.createRequest);
	app.post('/register', Middleware.checkBody(['email', 'hash', 'name', 'dob', 'phone', 'address']), Handler.register); //Registration endpoint

	app.put('/request/:id', Middleware.checkToken, Handler.updateRequest);

	app.listen(config.port, () => {
		console.log(`Web service started on port ${config.port}.`);
	});
}

main();