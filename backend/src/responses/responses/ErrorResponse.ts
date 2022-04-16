import ResponseBase from "../ResponseBase";

export enum ReqError{
	MissingProp = 10000, //Request is incomplete
	InvalidToken, //User's token is invalid
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