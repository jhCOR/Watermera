import Response from "../Response";

export default interface RegistrationResponse extends Response{
	data: {
		uid: string;
	} | null;
}