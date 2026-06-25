import { OptionalAccessTokenGuard } from '@api/public/auth/guards/optional-access-token.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function OptionalAuth() {
	return applyDecorators(UseGuards(OptionalAccessTokenGuard));
}
