import { Prisma } from '@generated/postgres/client';
import { userSelect } from '@libs/prisma/user-select.prisma';

export type UserProviderWithUserDto = Prisma.UserProviderGetPayload<{
	include: { user: { select: typeof userSelect } };
}>;
