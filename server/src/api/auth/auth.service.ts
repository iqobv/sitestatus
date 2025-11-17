import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenType, User } from 'generated/prisma/client';
import ms, { StringValue } from 'ms';
import { getCookieConfig } from 'src/config';
import { MailService } from 'src/infra/mail/mail.service';
import { comparePassword } from 'src/libs/utils';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly jwtService: JwtService,
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

		await this.mailService.sendVerficationEmail(user.email, user.id, token);

		return {
			message: 'Registration successful. Please check your email.',
		};
	}

	async login(dto: LoginDto, res: Response) {
		const user = await this.validateUser(dto);

		if (!user.emailVerified) {
			throw new ForbiddenException('Please verify your email first.');
		}

		return await this.createSession(user, res);
	}

	async logout(req: Request, res: Response) {
		const token = req.cookies['refreshToken'] as string;
		const user = req.user as User;

		if (!token || !user) return;

		this.setRefreshTokenCookie(res, '', 0);

		await this.tokenService.removeTokenWithSelector(
			user.id,
			token,
			TokenType.REFRESH,
		);

		return true;
	}

	async createSession(user: User, res: Response) {
		const { accessToken, refreshToken } = await this.generateTokens(user);
		const expiresAt = this.getRefreshExpiresAt();

		this.setRefreshTokenCookie(res, refreshToken, expiresAt);

		return {
			accessToken,
		};
	}

	async verifyEmail(userId: string, token: string) {
		const isValid = await this.tokenService.validateTokenForUser(
			userId,
			token,
			TokenType.EMAIL_VERIFICATION,
		);

		if (!isValid) {
			throw new BadRequestException('Invalid or expired token');
		}

		await this.userService.update(userId, { emailVerified: true });

		return { message: 'Email verified successfully' };
	}

	async refreshTokens(req: Request, res: Response) {
		const oldRefreshToken = req.cookies['refreshToken'] as string;

		if (!oldRefreshToken) {
			throw new UnauthorizedException('No refresh token provided');
		}

		const userId = await this.tokenService.validateTokenWithSelector(
			oldRefreshToken,
			TokenType.REFRESH,
		);

		if (!userId) {
			throw new UnauthorizedException('Invalid or expired refresh token');
		}

		const user = await this.userService.findById(userId);
		if (!user) throw new ForbiddenException('Access Denied');

		await this.tokenService.removeTokenWithSelector(
			user.id,
			oldRefreshToken,
			TokenType.REFRESH,
		);

		const { accessToken, refreshToken } = await this.generateTokens(user);
		this.setRefreshTokenCookie(res, refreshToken, this.getRefreshExpiresAt());

		return {
			accessToken,
		};
	}

	private setRefreshTokenCookie(
		res: Response,
		refreshToken: string,
		expiresAt: number,
	) {
		res.cookie(
			'refreshToken',
			refreshToken,
			getCookieConfig(this.configService, expiresAt),
		);
	}

	private async validateUser(dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email, true);

		if (!user || !user.password) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await comparePassword(dto.password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return user;
	}

	private getRefreshExpiresAt() {
		const expiresAt = ms(
			this.configService.getOrThrow<StringValue>('JWT_REFRESH_TTL'),
		);

		return expiresAt;
	}

	private async generateTokens(user: User) {
		const accessToken = await this.generateAccessToken(user);
		const expiresAt = this.getRefreshExpiresAt();

		const refreshToken = await this.tokenService.createToken({
			userId: user.id,
			type: TokenType.REFRESH,
			expiresAt: new Date(Date.now() + expiresAt),
			isSelector: true,
		});

		return {
			...accessToken,
			refreshToken,
		};
	}

	private async generateAccessToken(user: User) {
		const payload = { sub: user.id, email: user.email, role: user.role };

		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.getOrThrow<string>('JWT_SECRET'),
			expiresIn: this.configService.getOrThrow<StringValue>('JWT_ACCESS_TTL'),
		});

		return {
			accessToken,
		};
	}
}
