import ResponseBase, { GenErr } from "../ResponseBase";

export enum LoginResult{
	Success, //Login succeeds
	NotRegistered, //User does not exist
	WrongPassword, //User provided wrong password
}

export default interface LoginResponse extends ResponseBase{
	res: LoginResult | GenErr;
	data: {
		uid: string;
		token: string;
	} | null;
}