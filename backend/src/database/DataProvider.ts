import LoginRequest from "../requests/LoginRequest";
import RegisterRequest from "../requests/RegisterRequest";
import GetUserDataResponse, { GetUserDataResult } from "../responses/responses/GetUserDataResponse";
import { LoginResult } from "../responses/responses/LoginResponse";
import { RegResult } from "../responses/responses/RegistrationResponse";

export default abstract class DataProvider{
	/**
	 * Initiates database.
	 */
	abstract init(): Promise<boolean>;

	/**
	 * Registers a new user
	 * @param req Registration request, check interface for more info
	 */
	abstract register(req: RegisterRequest): Promise<{res: Exclude<RegResult, RegResult.Success | RegResult.Invalid>} | {res: RegResult.Success, uid: string}>;
	abstract login(req: LoginRequest): Promise<{res: Exclude<LoginResult, LoginResult.Success>} | {res: LoginResult.Success, uid: string}>;
	abstract getUserData(uid: string): Promise<{res: GetUserDataResult.Success, data: GetUserDataResponse['data']}>;
}