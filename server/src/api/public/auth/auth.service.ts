import { Prisma } from '@generated/postgres/client';
import { TokenType } from '@generated/postgres/enums';
import { MailService } from '@infra/mail/mail.service';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { userSelect } from '@libs/prisma/user-select.prisma';
import { JwtPayload } from '@libs/types/jwt-payload.types';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { withField } from '@libs/utils/error-with-field.util';
import { hashToken } from '@libs/utils/hashToken.util';
import { comparePassword, hashPassword } from '@libs/utils/password.util';
import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { SessionService } from '../session/session.service';
import { TokenService } from '../token/token.service';
import { UserProviderService } from '../user-provider/user-provider.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { OAuthDto } from './dto/o-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly configService: ConfigService,
		private readonly mailService: MailService,
		private readonly prismaService: PgPrismaService,
		private readonly jwtService: JwtService,
		private readonly sessionService: SessionService,
		private readonly userProviderService: UserProviderService,
	) {}

	public async register(dto: CreateUserDto): Promise<MessageResponse> {
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
				meta: {
					email: user.email,
				},
			};
		});
	}

	public async login(
		dto: LoginDto,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		const { email, password } = dto;

		const user = await this.userService.findByEmail(email, true);

		if (!user || !user.password)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		const isMatch = await comparePassword(password, user.password);

		if (!isMatch)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		if (!user.emailVerified)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED);

		return await this.generateAndSaveTokens(user, clientInfo);
	}

	public async logout(rawRefreshToken: string, userId: string): Promise<void> {
		const hashedToken = hashToken(rawRefreshToken);

		const session = await this.prismaService.session.findUnique({
			where: { refreshToken: hashedToken },
		});

		if (session && session.userId === userId) {
			await this.sessionService.deleteSession(session.id, userId);
		}
	}

	public async validateUser(
		email: string,
		password: string,
	): Promise<UserDto | null> {
		const user = await this.userService.findByEmail(email, true);

		if (!user) return null;

		const isMatch =
			!!password &&
			!!user.password &&
			(await comparePassword(password, user?.password));

		if (!isMatch) return null;

		return user;
	}

	public async verifyEmail(
		token: string,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		return await this.prismaService.$transaction(async (tx) => {
			const user = await this.tokenService.verifyAndConsumeToken(
				token,
				TokenType.EMAIL_VERIFICATION,
				tx,
			);

			if (user.emailVerified)
				throw new BadRequestException(ERROR_MESSAGES.AUTH.ALREADY_VERIFIED);

			await tx.user.update({
				where: { id: user.id },
				data: { emailVerified: true },
				select: userSelect,
			});

			return await this.generateAndSaveTokens(user, clientInfo, tx);
		});
	}

	public async resendVerification(email: string): Promise<void> {
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
	}

	public async forgotPassword(email: string): Promise<void> {
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

	public async resetPassword(dto: ResetPasswordDto): Promise<void> {
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
	}

	public async changePassword(
		userId: string,
		dto: ChangePasswordDto,
	): Promise<void> {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
		});

		if (!user || !user.password)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		const isMatch = await comparePassword(dto.oldPassword, user.password);

		if (!isMatch)
			throw new BadRequestException(
				withField(ERROR_MESSAGES.AUTH.OLD_PASSWORD_INCORRECT, 'oldPassword'),
			);

		const hashedPassword = await hashPassword(dto.newPassword);

		await this.prismaService.user.update({
			where: { id: userId },
			data: { password: hashedPassword },
		});
	}

	public async refreshTokens(
		rawRefreshToken: string,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		const hashedToken = hashToken(rawRefreshToken);

		const session = await this.prismaService.session.findUnique({
			where: { refreshToken: hashedToken },
		});

		if (!session || session.expiresAt < new Date()) {
			if (session) {
				await this.sessionService.deleteSession(session.id, session.userId);
			}

			throw new UnauthorizedException(
				ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_REFRESH_TOKEN,
			);
		}

		const user = await this.prismaService.user.findUnique({
			where: { id: session.userId },
		});

		if (!user || !user.emailVerified) throw new UnauthorizedException();

		const newRawRefreshToken = crypto.randomBytes(32).toString('hex');
		const newRefreshTokenHash = hashToken(newRawRefreshToken);

		const now = new Date();
		const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

		const updatedSession = await this.sessionService.rotateSession(session.id, {
			userId: user.id,
			refreshTokenHash: newRefreshTokenHash,
			clientInfo,
			expiresAt,
		});

		const payload: JwtPayload = {
			id: user.id,
			email: user.email,
			role: user.role,
			sessionId: updatedSession.id,
			createdAt: user.createdAt,
		};

		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
			expiresIn: '15m',
		});

		return { accessToken, refreshToken: newRawRefreshToken };
	}

	public async validateOAuthLogin(
		dto: OAuthDto,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		const { provider, providerId, email } = dto;

		return await this.prismaService.$transaction(async (tx) => {
			const providerUser =
				await this.userProviderService.findByProviderAndProviderId(
					provider,
					providerId,
					tx,
				);

			if (providerUser) {
				return await this.generateAndSaveTokens(
					providerUser.user,
					clientInfo,
					tx,
				);
			}

			let user: UserDto | null = await this.userService.findByEmail(
				email,
				false,
				false,
				tx,
			);

			if (!user) {
				user = await this.userService.create({ email }, tx);
			}

			await this.userProviderService.create(
				{
					provider,
					providerId,
					userId: user.id,
				},
				tx,
			);

			return await this.generateAndSaveTokens(user, clientInfo, tx);
		});
	}

	public async generateRestoreAccountToken(email: string): Promise<void> {
		const user = await this.userService.findByEmail(email, true, true);

		if (!user) return;

		const token = await this.tokenService.createToken({
			userId: user.id,
			type: TokenType.RESTORE_ACCOUNT,
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
		});

		await this.mailService.sendRestoreAccountEmail(user.email, token);
	}

	public async restoreAccount(
		token: string,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		return await this.prismaService.$transaction(async (tx) => {
			const user = await this.tokenService.verifyAndConsumeToken(
				token,
				TokenType.RESTORE_ACCOUNT,
				tx,
			);

			const tokens = await this.generateAndSaveTokens(user, clientInfo);

			await tx.user.update({
				where: { id: user.id },
				data: { deletedAt: null },
			});

			return tokens;
		});
	}

	private async generateAndSaveTokens(
		user: UserDto,
		clientInfo: ClientInfoDto,
		tx?: Prisma.TransactionClient,
	): Promise<TokensDto> {
		const rawRefreshToken = crypto.randomBytes(32).toString('hex');
		const refreshTokenHash = hashToken(rawRefreshToken);

		const now = new Date();
		const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

		const session = await this.sessionService.createSession(
			{
				userId: user.id,
				refreshTokenHash,
				clientInfo,
				expiresAt,
			},
			tx,
		);

		const payload: JwtPayload = {
			id: user.id,
			email: user.email,
			role: user.role,
			sessionId: session.id,
			createdAt: user.createdAt,
		};

		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
			expiresIn: '15m',
		});

		return { accessToken, refreshToken: rawRefreshToken };
	}
}
