import express from "express";
import { ErrorResponse, ReqError } from "../responses/responses/ErrorResponse";
import jsonwebtoken from 'jsonwebtoken';

export default async function checkToken(req: express.Request, res: express.Response, next: express.NextFunction){
    if(!req.headers.authorization) {
        const data: ErrorResponse = {
			res: ReqError.NoToken,
			reason: 'Authorisation header is missing.'
		}
        res.json(data);
		return;
    }
    const auth: string = req.headers.authorization as string;
    const token = auth.split(' ');
    if(token.length < 2) {
        const data: ErrorResponse = {
			res: ReqError.NoToken,
			reason: 'Authorisation header is missing.'
		}
        res.json(data);
		return;
    }
    try{
        res.locals.user = jsonwebtoken.verify(token[1], req.app.get('jwtKey'));
        next();
    } catch(e){
        const data: ErrorResponse = {
			res: ReqError.InvalidToken,
			reason: 'Token is unverified.'
		}
        res.json(data);
		return;
    }    
}