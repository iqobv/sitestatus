import { Roles } from '@api/public/auth/decorators';
import { AccessTokenGuard, RolesGuard } from '@api/public/auth/guards';
import { UserRole } from '@generated/postgres/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(AccessTokenGuard, RolesGuard),
			ApiUnauthorizedResponse({ description: 'Unauthorized' }),
		);
	}
	return applyDecorators(
		UseGuards(AccessTokenGuard),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
	);
}
