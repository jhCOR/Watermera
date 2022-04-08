import express from "express";
import Database from "../database/DataProvider";
import RegisterRequest from "../requests/RegisterRequest";
import { GenErr } from "../responses/Response";
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
		if((/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/.test(request.address))){
			const query = await db.register(request);
			response.res = query.res;
			if(query.res === RegResult.Success) response.data = {uid: query.uid};
		} else response.res = RegResult.Invalid;
		response.reason = reasons[response.res];
	} catch(e){
		response.res = GenErr.SQL;
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}