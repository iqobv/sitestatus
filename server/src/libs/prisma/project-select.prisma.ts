import { Prisma } from 'generated/prisma/client';

export const projectSelect: Prisma.ProjectSelect = {
	id: true,
	slug: true,
	name: true,
	description: true,
	createdAt: true,
	updatedAt: true,
};
