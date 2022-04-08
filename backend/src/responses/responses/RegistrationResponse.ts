import ResponseBase, { GenErr } from "../ResponseBase";

export enum RegResult{
	Success,
	Invalid,
	Registered
}

export default interface RegistrationResponse extends ResponseBase{
	res: RegResult | GenErr;
	data: {
		uid: string;
	} | null;
}