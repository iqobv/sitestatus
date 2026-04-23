import { JwtPayload } from '@libs/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const token = request?.cookies['accessToken'] as string | undefined;
					return token || null;
				},
			]),
			secretOrKey: process.env.JWT_ACCESS_SECRET!,
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}
