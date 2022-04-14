import createRequest from "./handlers/createRequest";
import getTestRequests from "./handlers/getTestRequests";
import getUserData from "./handlers/getUserData";
import login from "./handlers/login";
import register from "./handlers/register";

export default class Handler{
	static register = register;
	static login = login;
	static getUserData = getUserData;
	static getTestRequests = getTestRequests;
	static createRequest = createRequest;
}