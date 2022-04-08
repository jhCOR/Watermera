export enum GenErr{
	SQL = -1, //Error code for all SQL errors
}

export default interface ResponseBase{
	reason?: string;
}