export enum PostTestReqResult{
	Success,
}

export default interface PostTestReqResponse{
	readonly res: PostTestReqResult;
	readonly data: {
		readonly reqid: string;
	} | null;
}