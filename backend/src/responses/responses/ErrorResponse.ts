import ResponseBase from "../ResponseBase";

export enum ReqError{
	MissingProp = 1, //Request is incomplete
	Unauthenticated, //User's token is invalid
	NoToken, //Token is missing
}

export type ErrorResponse = {
	reason: string
} & ResponseBase
& ({
	res: ReqError.MissingProp,
	additional: string
} | {
	res: Exclude<ReqError, ReqError.MissingProp>
})