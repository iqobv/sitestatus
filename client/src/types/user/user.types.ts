import { UserRole } from './userRole.types';

export interface User {
	id: string;
	email: string;
	createdAt: Date;
	role: UserRole;
	emailVerified: boolean;
}
