import ResponseBase, { GenErr } from "../ResponseBase";

export enum PostTestReqResult{
	Success,
}

export default interface PostTestReqResponse extends ResponseBase{
	res: GenErr | PostTestReqResult;
	data: {
		reqid: string;
	} | null;
}