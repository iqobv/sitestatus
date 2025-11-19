import { IUser } from '../user/user.types';

export interface ILoginResponse {
	accessToken: string;
	user: IUser;
}
