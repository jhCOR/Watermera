import express from "express";
import Database from "../database/DataProvider";
import RegisterRequest from "../requests/RegisterRequest";
import { GenErr } from "../responses/ResponseBase";
import RegistrationResponse, { RegResult } from "../responses/responses/RegistrationResponse";

const reasons = ['', 'Invalid email.', 'You are already registered.'];

export default async function register(req: express.Request, res: express.Response){
	const request = req.body as RegisterRequest;
	const db = req.app.get('db') as Database;
	let response: RegistrationResponse = {
		res: -999,
		data: null
	}
	try{
		if((/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(request.address))){ //Check regex
			const query = await db.register(request); //Register user
			response.res = query.res; //Set result code
			if(query.res === RegResult.Success) response.data = {uid: query.uid}; //If succeeded, set UID in response
		} else response.res = RegResult.Invalid; //Set result code if email is invalid
		response.reason = reasons[response.res]; //Set reason message
	} catch(e){
		response.res = GenErr.SQL; //Set error code to SQL error
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}