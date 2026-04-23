import { User, UserRole } from '@generated/postgres/client';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!roles || roles.length === 0) {
			return true;
		}

		const req: Request = context.switchToHttp().getRequest();
		const user = req.user as User;

		if (!user || !roles.includes(user.role)) {
			throw new ForbiddenException(ERROR_MESSAGES.AUTH.ACCESS_DENIED);
		}

		return true;
	}
}
