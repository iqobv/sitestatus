import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { TokenType } from 'generated/prisma/client';
import { MailService } from 'src/infra/mail/mail.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/libs/constants';
import { userSelect } from 'src/libs/prisma';
import { ClientInfo } from 'src/libs/types';
import { comparePassword, hashPassword } from 'src/libs/utils';
import { SessionService } from '../session/session.service';
import { TokenService } from '../token/token.service';
import { UserProviderService } from '../user-provider/user-provider.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { ChangePasswordDto, LoginDto, OAuthDto, ResetPasswordDto } from './dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly configService: ConfigService,
		private readonly mailService: MailService,
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly sessionService: SessionService,
		private readonly userProviderService: UserProviderService,
	) {}

	async register(dto: CreateUserDto) {
		return await this.prismaService.$transaction(async (tx) => {
			const user = await this.userService.create(dto, tx);

			const expiresAt = new Date();
			expiresAt.setHours(expiresAt.getHours() + 24);

			const token = await this.tokenService.createToken(
				{
					userId: user.id,
					type: TokenType.EMAIL_VERIFICATION,
					expiresAt,
				},
				tx,
			);

			await this.mailService.sendVerificationEmail(user.email, token);

			return {
				...SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
				email: user.email,
			};
		});
	}

	async login(dto: LoginDto, clientInfo: ClientInfo) {
		const { email, password } = dto;

		const user = await this.userService.findByEmail(email, true);

		if (!user || !user.password)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		const isMatch = await comparePassword(password, user.password);
		if (!isMatch)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		if (!user.emailVerified)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED);

		return await this.generateAndSaveTokens(user.id, user.email, clientInfo);
	}

	async logout(rawRefreshToken: string, userId: string) {
		const hashedToken = crypto
			.createHash('sha256')
			.update(rawRefreshToken)
			.digest('hex');

		const session = await this.prismaService.session.findUnique({
			where: { refreshToken: hashedToken },
		});

		if (session && session.userId === userId) {
			await this.sessionService.deleteSession(session.id, userId);
		}
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

	async verifyEmail(token: string, clientInfo: ClientInfo) {
		const user = await this.tokenService.verifyAndConsumeToken(
			token,
			TokenType.EMAIL_VERIFICATION,
		);

		await this.prismaService.user.update({
			where: { id: user.id },
			data: { emailVerified: true },
			select: userSelect,
		});

		const tokens = await this.generateAndSaveTokens(
			user.id,
			user.email,
			clientInfo,
		);
		return { ...SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED, user, tokens };
	}

	async resendVerification(email: string) {
		const user = await this.userService.findByEmail(email, false);

		if (!user) return;

		if (user.emailVerified)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.ALREADY_VERIFIED);

		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 24);

		const token = await this.tokenService.createToken({
			userId: user.id,
			type: TokenType.EMAIL_VERIFICATION,
			expiresAt,
		});

		await this.mailService.sendVerificationEmail(user.email, token);

		return SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL;
	}

	async forgotPassword(email: string) {
		const user = await this.userService.findByEmail(email, true);
		if (!user || !user.password) return;

		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 24);

		const token = await this.tokenService.createToken({
			type: TokenType.RESET_PASSWORD,
			userId: user.id,
			expiresAt,
		});

		await this.mailService.sendPasswordResetEmail(user.email, token);
	}

	async resetPassword(dto: ResetPasswordDto) {
		const user = await this.tokenService.verifyAndConsumeToken(
			dto.token,
			TokenType.RESET_PASSWORD,
		);
		const hashedPassword = await hashPassword(dto.newPassword);

		await this.prismaService.user.update({
			where: { id: user.id },
			data: { password: hashedPassword },
		});

		await this.prismaService.session.deleteMany({ where: { userId: user.id } });

		return SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD;
	}

	async changePassword(userId: string, dto: ChangePasswordDto) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
		});
		if (!user || !user.password) throw new UnauthorizedException();

		const isMatch = await comparePassword(dto.oldPassword, user.password);
		if (!isMatch)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		const hashedPassword = await hashPassword(dto.newPassword);

		await this.prismaService.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});

		return SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD;
	}

	async refreshTokens(rawRefreshToken: string, clientInfo: ClientInfo) {
		const hashedToken = crypto
			.createHash('sha256')
			.update(rawRefreshToken)
			.digest('hex');

		const session = await this.prismaService.session.findUnique({
			where: { refreshToken: hashedToken },
		});

		if (!session || session.expiresAt < new Date()) {
			if (session)
				await this.sessionService.deleteSession(session.id, session.userId);

			throw new UnauthorizedException(
				ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_REFRESH_TOKEN,
			);
		}

		const user = await this.prismaService.user.findUnique({
			where: { id: session.userId },
		});

		if (!user || !user.emailVerified) throw new UnauthorizedException();

		await this.sessionService.deleteSession(session.id, session.userId);
		return this.generateAndSaveTokens(user.id, user.email, clientInfo);
	}

	async validateOAuthLogin(dto: OAuthDto, clientInfo: ClientInfo) {
		const { provider, providerId, email } = dto;

		const providerUser =
			await this.userProviderService.findByProviderAndProviderId(
				provider,
				providerId,
			);

		if (providerUser)
			return await this.generateAndSaveTokens(
				providerUser.user.id,
				providerUser.user.email,
				clientInfo,
			);

		let user = await this.userService.findByEmail(email, true);
		if (!user) {
			user = await this.userService.createOauthUser(email);
		}

		await this.userProviderService.create({
			provider,
			providerId,
			userId: user.id,
		});

		return await this.generateAndSaveTokens(user.id, user.email, clientInfo);
	}

	private async generateAndSaveTokens(
		userId: string,
		email: string,
		clientInfo: ClientInfo,
	) {
		const accessToken = this.jwtService.sign(
			{ id: userId, email },
			{ secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
		);

		const rawRefreshToken = crypto.randomBytes(32).toString('hex');
		const refreshTokenHash = crypto
			.createHash('sha256')
			.update(rawRefreshToken)
			.digest('hex');

		const now = new Date();
		const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

		await this.sessionService.createSession({
			userId,
			refreshTokenHash,
			clientInfo,
			expiresAt,
		});

		return { accessToken, refreshToken: rawRefreshToken };
	}
}
