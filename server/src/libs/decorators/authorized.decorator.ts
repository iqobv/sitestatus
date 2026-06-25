import { JwtPayload } from '@libs/types/jwt-payload.types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const Authorized = createParamDecorator(
	(data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();
		const user = request.user;

		if (!user) return null;

		if (!data) return user;

		return user[data];
	},
);
