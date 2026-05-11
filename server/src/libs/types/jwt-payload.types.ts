import { UserRole } from '@generated/postgres/enums';

export interface JwtPayload {
	id: string;
	email: string;
	role: UserRole;
	sessionId: string;
	createdAt: Date;
}
