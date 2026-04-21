import { applyDecorators, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../guards/access-token.guard';

export function Auth() {
	return applyDecorators(UseGuards(AccessTokenGuard));
}
