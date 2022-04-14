export default interface RegisterRequest{
	readonly email: string;
	readonly hash: string; //Password must be hashed on both client and server side to ensure the server does not learn the password, and the hash is not simply used as an 'password alias'
	readonly name: string; //Name of the user
	readonly dob: Date; //Date of birth
	readonly phone: string;
	readonly address: string;
}