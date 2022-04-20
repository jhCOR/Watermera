import ResponseBase, { GenErr } from "../ResponseBase";

export enum AddRecordsResult{
	Success,
	NotAllowed
}

export default interface AddRecordsResponse extends ResponseBase{
	res: GenErr | AddRecordsResult;
	data: {
		records: string[];
	} | null;
}