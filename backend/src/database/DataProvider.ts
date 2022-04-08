import RegisterRequest from "../requests/RegisterRequest";
import { RegResult } from "../responses/responses/RegistrationResponse";

export default abstract class DataProvider{
	abstract init(): Promise<boolean>;
	abstract register(req: RegisterRequest): Promise<{res: RegResult.Invalid | RegResult.Registered} | {res: RegResult.Success, uid: string}>;
}