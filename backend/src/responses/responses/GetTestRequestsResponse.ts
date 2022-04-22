import RequestPost from "../../types/RequestPost";
import ResponseBase, { GenErr } from "../ResponseBase";

export enum GetTestRequestsResult{
	Success,
}

export default interface GetTestRequestsResponse extends ResponseBase{
	res: GetTestRequestsResult | GenErr;
	data: {
		posts: RequestPost[];
		allPosts: boolean;
	} | null;
}