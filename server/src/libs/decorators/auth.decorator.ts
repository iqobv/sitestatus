import { Roles } from '@api/public/auth/decorators/roles.decorator';
import { AccessTokenGuard } from '@api/public/auth/guards/access-token.guard';
import { RolesGuard } from '@api/public/auth/guards/roles.guard';
import { UserRole } from '@generated/postgres/enums';
import { ERROR_MESSAGES } from '@libs/constants';
import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiErrorResponse } from './api-response.decorator';

const errorMessage = ApiErrorResponse(
	HttpStatus.UNAUTHORIZED,
	ERROR_MESSAGES.AUTH.UNAUTHORIZED,
);

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(AccessTokenGuard, RolesGuard),
			errorMessage,
		);
	}
	return applyDecorators(UseGuards(AccessTokenGuard), errorMessage);
}
