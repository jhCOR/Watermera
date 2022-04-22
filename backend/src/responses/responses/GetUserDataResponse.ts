import ResponseBase, { GenErr } from "../ResponseBase";

export enum GetUserDataResult{
	Success,
}

export default interface GetUserDataResponse extends ResponseBase{
	res: GetUserDataResult | GenErr;
	data: {
		uid: string;
		email: string;
		name: string;
		dob: Date;
		phone: string;
		address: string;
	} | null;
}