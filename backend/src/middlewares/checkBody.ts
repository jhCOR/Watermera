import { RequestHandler } from "express";
import ErrorResponse, { ReqError } from "../responses/responses/ErrorResponse";

/**
 * Checks if body has all necessary properties
 * @param properties List of properties to check
 * @returns A middleware that does the property check, which filters incomplete requests
 */
export default function checkBody(properties: string[]): RequestHandler{
	return (req, res, next) => { //Returns a request handler function
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