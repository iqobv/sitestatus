import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class WorkerAuthGuard implements CanActivate {
	constructor(private configService: ConfigService) {}

	canActivate(context: ExecutionContext): boolean {
		const request: Request = context.switchToHttp().getRequest();
		const secret = request.headers['x-worker-secret'];
		const validSecret = this.configService.get<string>('WORKER_SECRET_KEY');

		if (!secret || secret !== validSecret) {
			throw new UnauthorizedException('Invalid worker secret');
		}

		return true;
	}
}
