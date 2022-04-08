import ResponseBase from "../ResponseBase";

export enum ReqError{
	MissingProp = 1, //Request is incomplete
	Unauthenticated, //User's token is invalid
	NoToken, //Token is missing
}

type RequiredInfo = {
	[ReqError.MissingProp]: string, //Returns missing property
	[ReqError.Unauthenticated]: undefined,
	[ReqError.NoToken]: undefined
}

export default interface ErrorResponse<T extends ReqError> extends ResponseBase{
	res: T,
	reason: string,
	additional: RequiredInfo[T] //Additional info if the error can provide one
}