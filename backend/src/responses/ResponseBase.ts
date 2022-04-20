export enum GenErr{
	Default = -999, //Request result code has not been written
	SQL = -1, //Error code for all SQL errors
}

export default interface ResponseBase{
	reason?: string;
	res: number;
}