import RegisterRequest from "../requests/RegisterRequest";
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
	abstract register(req: RegisterRequest): Promise<{res: RegResult.Invalid | RegResult.Registered} | {res: RegResult.Success, uid: string}>;
}