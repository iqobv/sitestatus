import { Prisma } from '@generated/postgres/client';

export const projectSelect = {
	id: true,
	name: true,
	description: true,
	createdAt: true,
	updatedAt: true,
} satisfies Prisma.ProjectSelect;
