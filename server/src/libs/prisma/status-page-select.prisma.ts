import { Prisma } from '@generated/postgres/client';

export const publicStatusPageSelect = {
	id: true,
	slug: true,
	title: true,
	description: true,
} satisfies Prisma.StatusPageSelect;
