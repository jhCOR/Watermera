import ResponseBase, { GenErr } from "../ResponseBase";

export enum UpdateTestReqResult{
	Success, // Edit has been applied successfully
	DoesNotExist, // Post does not exist
	NotAllowed, // User is not allowed to edit this
	AlreadyReviewed // Test has already been initiated, no point editing location/notes
}

export default interface UpdateTestReqResponse extends ResponseBase{
	res: UpdateTestReqResult | GenErr;
}