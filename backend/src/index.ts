import express from "express";
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function main(){
	const configPath = path.resolve('./config/config.json');

	if(!fs.existsSync(configPath)){
		fs.writeFileSync(configPath, JSON.stringify({
			jwtKey: Buffer.from(crypto.randomBytes(64)).toString('base64'),
			allowedOrigins: []
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

	app.listen(8080, () => {
		console.log('Web service started.');
	});
}

main();