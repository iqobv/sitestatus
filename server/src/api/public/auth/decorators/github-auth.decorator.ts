import { applyDecorators, UseGuards } from '@nestjs/common';
import { GithubAuthGuard } from '../guards/github-auth.guard';

export function GithubAuth() {
	return applyDecorators(UseGuards(GithubAuthGuard));
}
