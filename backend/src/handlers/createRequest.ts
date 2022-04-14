import express from "express";
import DataProvider from "../database/DataProvider";
import PostTestReqRequest from "../requests/PostTestReqRequest";
import { GenErr } from "../responses/ResponseBase";
import PostTestReqResponse, { PostTestReqResult } from "../responses/responses/PostTestReqResponse";

export default async function createRequest(req: express.Request, res: express.Response){
	const request = req.body as PostTestReqRequest;
	const db = req.app.get('db') as DataProvider;
	let response: PostTestReqResponse = {
		res: GenErr.Default,
		data: null
	}
	try{
		const query = await db.createTestRequest(res.locals.user.uid, request);
		response.res = query.res; //Set result code
		if (query.res === PostTestReqResult.Success) response.data = query.data;
		//if (response.res) response.reason = reasons[response.res]; //Set reason message, but there aren't errors
	} catch(e){
		response.res = GenErr.SQL; //Set error code to SQL error
		console.log(e);
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}