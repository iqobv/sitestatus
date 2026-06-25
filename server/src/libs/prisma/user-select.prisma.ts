import { Prisma } from '@generated/postgres/client';

export const userSelect = {
	id: true,
	email: true,
	role: true,
	emailVerified: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
} satisfies Prisma.UserSelect;
