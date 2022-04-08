import RegisterRequest from "../requests/RegisterRequest";

export default abstract class DataProvider{
	abstract init(): Promise<boolean>;
	abstract register(req: RegisterRequest): Promise<{res: 1 | 2 | 3} | {res: 0, uid: string}>;
}