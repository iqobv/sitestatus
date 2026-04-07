import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();

		const userId = req.session.userId;

		if (typeof userId === 'undefined') {
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
		}

		const user = await this.userService.findById(userId);

		if (!user) {
			req.session.destroy(() => {});
			return false;
		}

		req.user = user;

		return true;
	}
}
