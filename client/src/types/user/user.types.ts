import { USER_ROLES } from '@/constants';

export interface User {
	id: string;
	email: string;
	createdAt: Date;
	role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
	emailVerified: boolean;
}
