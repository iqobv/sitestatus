import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';
import { Roles } from 'src/api/public/auth/decorators';
import { AccessTokenGuard, RolesGuard } from 'src/api/public/auth/guards';

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
