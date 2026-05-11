import { applyDecorators, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from '../guards';

export function GithubAuth() {
	return applyDecorators(UseGuards(GithubAuthGuard));
}
