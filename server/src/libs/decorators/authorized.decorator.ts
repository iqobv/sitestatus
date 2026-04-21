import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { JwtPayload } from '../types';

export const Authorized = createParamDecorator(
	(data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();
		const user = request.user;

		if (!user) return null;

		if (!data) return user;

		return user[data];
	},
);
