import ErrorResponse from "../ErrorResponse";

export interface MissingPropError extends ErrorResponse{
	missing: string;
}