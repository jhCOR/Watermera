import Response, { GenErr } from "../Response";

export enum RegResult{
	Success,
	Invalid,
	Registered
}

export default interface RegistrationResponse extends Response{
	res: RegResult | GenErr;
	data: {
		uid: string;
	} | null;
}