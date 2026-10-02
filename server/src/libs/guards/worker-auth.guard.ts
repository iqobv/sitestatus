import { EnvService } from '@infra/env/env.service';
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class WorkerAuthGuard implements CanActivate {
	constructor(private readonly envService: EnvService) {}

	canActivate(context: ExecutionContext): boolean {
		const request: Request = context.switchToHttp().getRequest();
		const secret = request.headers['x-worker-secret'];
		const validSecret = this.envService.get('WORKER_SECRET_KEY');

		if (!secret || secret !== validSecret)
			throw new UnauthorizedException('Invalid worker secret');

		return true;
	}
}
