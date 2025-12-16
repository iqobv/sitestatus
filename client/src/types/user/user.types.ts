import { USER_ROLES } from '@/constants';

export interface IUser {
	id: string;
	email: string;
	createdAt: Date;
	role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
	emailVerified: boolean;
}
