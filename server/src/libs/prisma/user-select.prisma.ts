import { Prisma } from 'generated/prisma/client';

export const userSelect: Prisma.UserSelect = {
	id: true,
	email: true,
	createdAt: true,
	role: true,
	emailVerified: true,
};
