import ResponseBase, { GenErr } from "../ResponseBase";

export enum LoginResult{
	Success,
	NoEmail,
	WrongPassword,
}

export default interface LoginResponse extends ResponseBase{
	res: LoginResult | GenErr;
	data: {
		uid: string;
	} | null;
}