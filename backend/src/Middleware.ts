import checkBody from "./middlewares/checkBody";
import checkToken from "./middlewares/checkToken";

export default class Middleware{
	static checkToken = checkToken;
	static checkBody = checkBody;
}