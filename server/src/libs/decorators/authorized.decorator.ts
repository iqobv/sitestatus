import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { User } from 'generated/prisma/client';

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const user: User | null = req.user ?? null;

		if (!user) return null;

		return data ? user[data] : user;
	},
);
