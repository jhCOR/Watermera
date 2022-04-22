import express from "express";
import DataProvider from "../database/DataProvider";
import { GenErr } from "../responses/ResponseBase";
import GetTestRequestsResponse, { GetTestRequestsResult } from "../responses/responses/GetTestRequestsResponse";

export default async function login(req: express.Request, res: express.Response){
	const db = req.app.get('db') as DataProvider;
	let response: GetTestRequestsResponse = {
		res: GenErr.Default,
		data: null
	}
	try{
		const query = await db.getTestRequests(res.locals.user.uid);
		response.res = query.res; //Set result code
		if (query.res === GetTestRequestsResult.Success) response.data = query.data;
		//if (response.res) response.reason = reasons[response.res]; //Set reason message, but there aren't errors
	} catch(e){
		response.res = GenErr.SQL; //Set error code to SQL error
		console.log(e);
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}