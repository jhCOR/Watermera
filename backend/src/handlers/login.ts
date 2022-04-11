import express from "express";
import DataProvider from "../database/DataProvider";
import LoginRequest from "../requests/LoginRequest";
import { GenErr } from "../responses/ResponseBase";
import LoginResponse, { LoginResult } from "../responses/responses/LoginResponse";
import jsonwebtoken from 'jsonwebtoken';

const reasons = ['', 'You are not registered.', 'Wrong password.'];

export default async function login(req: express.Request, res: express.Response){
	const request = req.body as LoginRequest;
	const db = req.app.get('db') as DataProvider;
	let response: LoginResponse = {
		res: GenErr.Default,
		data: null
	}
	try{
		const query = await db.login(request); //Register user
		response.res = query.res; //Set result code
		if(query.res === LoginResult.Success) {
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
		if (response.res) response.reason = reasons[response.res]; //Set reason message
	} catch(e){
		response.res = GenErr.SQL; //Set error code to SQL error
		console.log(e);
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}