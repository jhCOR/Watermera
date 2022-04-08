import { RequestHandler } from "express";
import ErrorResponse, { ReqError } from "../responses/responses/ErrorResponse";

export default function checkBody(properties: string[]): RequestHandler{
	return (req, res, next) => {
		const bodyProps = Object.keys(req.body);
		bodyProps.sort();
		properties.sort();
		for(let i = 0; i < properties.length; i++) {
			if(bodyProps[i] !== properties[i]){
				const response: ErrorResponse<ReqError.MissingProp> = {
					res: ReqError.MissingProp,
					reason: 'Body is missing critical property.',
					additional: properties[i]
				};
				res.json(response);
				return;
			}
		}
		next();
	}
}