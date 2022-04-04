import express from "express";
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Handler from "./Handler";

function main(){
	const configPath = path.resolve('./config/config.json');

	if(!fs.existsSync(configPath)){
		fs.writeFileSync(configPath, JSON.stringify({
			jwtKey: Buffer.from(crypto.randomBytes(64)).toString('base64'),
			allowedOrigins: [],
			port: 8080
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

	app.post('/register', mem.single('reqbody'), Handler.register);

	app.listen(config.port, () => {
		console.log(`Web service started on port ${config.port}.`);
	});
}

main();