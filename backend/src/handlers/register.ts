import express from "express";
import DataProvider from "../database/DataProvider";
import RegisterRequest from "../requests/RegisterRequest";
import { GenErr } from "../responses/ResponseBase";
import RegistrationResponse, { RegResult } from "../responses/responses/RegistrationResponse";
import jsonwebtoken from 'jsonwebtoken';

const reasons = ['', 'Invalid email.', 'You are already registered.'];

export default async function register(req: express.Request, res: express.Response){
	const request = req.body as RegisterRequest;
	const db = req.app.get('db') as DataProvider;
	let response: RegistrationResponse = {
		res: GenErr.Default,
		data: null
	}
	try{
		//if((/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(request.email))){ //Check regex
		const query = await db.register(request); //Register user
		response.res = query.res; //Set result code
		if(query.res === RegResult.Success) {
			const token = jsonwebtoken.sign(
				{
					uid: query.uid
				}, 
				req.app.get('jwtKey'),
				{}
			);
			response.data = {
				uid: query.uid,
				token: token
			}; //If succeeded, set UID in response
		}
		//} else response.res = RegResult.Invalid; //Set result code if email is invalid
		if (response.res) response.reason = reasons[response.res]; //Set reason message
	} catch(e){
		response.res = GenErr.SQL; //Set error code to SQL error
		console.log(e);
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}