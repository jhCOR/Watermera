import ResponseBase from "../ResponseBase";

export enum ReqError{
	MissingProp = 1,
	Unauthenticated,
	NoToken,
}

type RequiredInfo = {
	[ReqError.MissingProp]: string,
	[ReqError.Unauthenticated]: undefined,
	[ReqError.NoToken]: undefined
}

export default interface ErrorResponse<T extends ReqError> extends ResponseBase{
	res: T,
	reason: string,
	additional: RequiredInfo[T]
}