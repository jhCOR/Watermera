import express from "express";
import DataProvider from "../database/DataProvider";
import PostTestReqRequest from "../requests/PostTestReqRequest";
import { GenErr } from "../responses/ResponseBase";
import UpdateTestReqResponse from "../responses/responses/UpdateTestReqResponse";

type UpdateTestReqRequest = Partial<PostTestReqRequest>;

export default async function updateRequest(req: express.Request, res: express.Response){
	const request = req.body as UpdateTestReqRequest;
	const db = req.app.get('db') as DataProvider;
	let response: UpdateTestReqResponse = {
		res: GenErr.Default,
	}
	try{
		const reqid = req.params.id as string;
		const query = await db.updateTestRequest(res.locals.user.uid, reqid, request);
		response.res = query.res; //Set result code
	} catch(e){
		response.res = GenErr.SQL; //Set error code to SQL error
		console.log(e);
		response.reason = 'SQL error raised.';
	}
	res.json(response);
}