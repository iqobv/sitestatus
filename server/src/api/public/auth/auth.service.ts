import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { TokenType, User } from 'generated/prisma/client';
import { getCookieConfig } from 'src/config';
import { MailService } from 'src/infra/mail/mail.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { comparePassword } from 'src/libs/utils';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly configService: ConfigService,
		private readonly mailService: MailService,
		private readonly prismaService: PrismaService,
	) {}

	async register(dto: CreateUserDto) {
		return await this.prismaService.$transaction(async (tx) => {
			const user = await this.userService.create(dto, tx);

			const expiresAt = new Date();
			expiresAt.setHours(expiresAt.getHours() + 1);

			const token = await this.tokenService.createToken(
				{
					userId: user.id,
					type: TokenType.EMAIL_VERIFICATION,
					expiresAt,
				},
				tx,
			);

			await this.mailService.sendVerificationEmail(user.email, user.id, token);

			return {
				...SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
				email: user.email,
			};
		});
	}

	async login(user: User, req: Request) {
		return new Promise((resolve, reject) => {
			req.login(user, (err) => {
				if (err)
					return reject(err instanceof Error ? err : new Error(String(err)));
				const { password, ...result } = user;

				resolve(result);
			});
		});
	}

	async logout(req: Request, res: Response) {
		return new Promise<void>((resolve, reject) => {
			req.session.destroy((err) => {
				if (err)
					return reject(err instanceof Error ? err : new Error(String(err)));
				res.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME') || 'sid',
					getCookieConfig(this.configService),
				);
				resolve();
			});
		});
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email, true);
		if (!user) return null;

		const isMatch =
			!!password &&
			!!user.password &&
			(await comparePassword(password, user?.password));

		if (!isMatch) return null;

		return user;
	}

	async verifyEmail(userId: string, token: string, req: Request) {
		return await this.prismaService.$transaction(async (tx) => {
			const isValid = await this.tokenService.validateTokenForUser(
				userId,
				token,
				TokenType.EMAIL_VERIFICATION,
				tx,
			);

			if (!isValid) {
				throw new BadRequestException(
					ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN,
				);
			}

			await this.userService.update(userId, { emailVerified: true });

			const user = await this.userService.findById(userId, false, tx);

			await this.login(user, req);

			return { ...SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED, user };
		});
	}

	async resendVerificationEmail(email: string) {
		return await this.prismaService.$transaction(async (tx) => {
			const user = await this.userService.findByEmail(email, false, tx);

			if (user && !user.emailVerified) {
				const token = await this.tokenService.createToken(
					{
						userId: user.id,
						type: TokenType.EMAIL_VERIFICATION,
						expiresAt: new Date(Date.now() + 3600 * 1000),
					},
					tx,
				);

				await this.mailService.sendVerificationEmail(
					user.email,
					user.id,
					token,
				);
			}

			return SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL;
		});
	}
}
