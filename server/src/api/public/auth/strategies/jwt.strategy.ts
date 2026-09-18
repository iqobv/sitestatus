import { EnvService } from '@infra/env/env.service';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { JwtPayload } from '@libs/types/jwt-payload.types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly envService: EnvService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const token = request?.cookies['accessToken'] as string | undefined;
					return token || null;
				},
			]),
			secretOrKey: envService.get('JWT_ACCESS_SECRET'),
		});
	}

	public async validate(payload: JwtPayload): Promise<JwtPayload> {
		const session = await this.prismaService.session.findUnique({
			where: { id: payload.sessionId },
		});

		if (!session)
			throw new UnauthorizedException(ERROR_MESSAGES.SESSIONS.NOT_FOUND);

		return payload;
	}
}
