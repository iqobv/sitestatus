import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { TokenType, User } from 'generated/prisma/client';
import { getCookieConfig } from 'src/config';
import { MailService } from 'src/infra/mail/mail.service';
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
	) {}

	async register(dto: CreateUserDto) {
		const user = await this.userService.create(dto);

		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 1);

		const token = await this.tokenService.createToken({
			userId: user.id,
			type: TokenType.EMAIL_VERIFICATION,
			expiresAt,
		});

		await this.mailService.sendVerificationEmail(user.email, user.id, token);

		return {
			message: 'Registration successful. Please check your email.',
			email: user.email,
		};
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
		const isValid = await this.tokenService.validateTokenForUser(
			userId,
			token,
			TokenType.EMAIL_VERIFICATION,
		);

		if (!isValid) {
			throw new BadRequestException('Invalid or expired token');
		}

		await this.userService.update(userId, { emailVerified: true });

		const user = await this.userService.findById(userId);

		await this.login(user, req);

		return { message: 'Email verified successfully', user };
	}

	async resendVerificationEmail(email: string) {
		const user = await this.userService.findByEmail(email);

		if (user && !user.emailVerified) {
			const token = await this.tokenService.createToken({
				userId: user.id,
				type: TokenType.EMAIL_VERIFICATION,
				expiresAt: new Date(Date.now() + 3600 * 1000),
			});

			await this.mailService.sendVerificationEmail(user.email, user.id, token);
		}

		return {
			message: 'Verification email has sent.',
		};
	}
}
