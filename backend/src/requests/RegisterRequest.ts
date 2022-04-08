export default interface RegisterRequest{
	email: string;
	hash: string; //Password must be hashed on both client and server side to ensure the server does not learn the password, and the hash is not simply used as an 'password alias'
	name: string; //Name of the user
	dob: Date; //Date of birth
	phone: string;
	address: string;
}