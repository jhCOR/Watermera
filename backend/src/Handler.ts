import login from "./handlers/login";
import register from "./handlers/register";

export default class Handler{
	static register = register;
	static login = login;
}