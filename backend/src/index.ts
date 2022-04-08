import express from "express";
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Handler from "./Handler";
import Middleware from "./Middleware";
import MySQL from "./database/MySQL";

function main(){
	const configPath = path.resolve('./config/config.json');

	if(!fs.existsSync(configPath)){
		fs.writeFileSync(configPath, JSON.stringify({
			jwtKey: Buffer.from(crypto.randomBytes(64)).toString('base64'),
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
	const mem = multer({storage: multer.memoryStorage()});

	const options: cors.CorsOptions = {
		origin: config.allowed,
	};

	app.use(cors(options));

	app.set('jwtKey', config.jwtKey);
	app.set('db', new MySQL(config.database.host, config.database.user, config.database.password, config.database.dbname));

	app.post('/register', Middleware.checkBody(['email', 'password', 'dob', 'address']), Handler.register);

	app.listen(config.port, () => {
		console.log(`Web service started on port ${config.port}.`);
	});
}

main();