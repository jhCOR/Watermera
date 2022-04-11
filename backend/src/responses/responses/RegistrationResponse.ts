import ResponseBase, { GenErr } from "../ResponseBase";

export enum RegResult{
	Success, //Registration succeeds
	Invalid, //Email is invalid
	Registered //User is already registered
}

export default interface RegistrationResponse extends ResponseBase{
	res: RegResult | GenErr;
	data: {
		uid: string;
		token: string;
	} | null;
}