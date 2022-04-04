import { RequestHandler } from "express";
import { MissingPropError } from "../responses/errors/MissingPropError";

export default function checkBody(properties: string[]): RequestHandler{
	return (req, res, next) => {
		const bodyProps = Object.keys(req.body);
		bodyProps.sort();
		properties.sort();
		for(let i = 0; i < properties.length; i++) {
			if(bodyProps[i] !== properties[i]){
				const response: MissingPropError = {
					errcode: 'E_MISSING_PROP',
					message: 'Body is missing critical property.',
					missing: properties[i]
				};
				res.json(response);
				return;
			}
		}
		next();
	}
}