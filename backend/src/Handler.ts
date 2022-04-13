import getUserData from "./handlers/getUserData";
import login from "./handlers/login";
import register from "./handlers/register";

export default class Handler{
	static register = register;
	static login = login;
	static getUserData = getUserData;
}