import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';
import { Roles } from 'src/api/auth/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/api/auth/guards';

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(JwtAuthGuard, RolesGuard),
			ApiBearerAuth(),
			ApiUnauthorizedResponse({ description: 'Unauthorized' }),
		);
	}
	return applyDecorators(
		UseGuards(JwtAuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
	);
}
