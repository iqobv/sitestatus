import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Cookie } from '@libs/decorators/cookie.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { extractClientInfo } from '@libs/utils/client-info.util';
import { clearAuthCookies, setAuthCookies } from '@libs/utils/cookie.util';
import { withField } from '@libs/utils/error-with-field.util';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserWithoutPasswordDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResendVerificationEmailDto } from './dto/resend-verification-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RestoreAccountDto } from './dto/restore-account.dto';
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@IsPublic()
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Register a new user' })
	@ApiSuccessResponse(HttpStatus.OK, {
		...SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
		meta: { email: 'user@example.com' },
	})
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.USER.ALREADY_EXISTS)
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	public async register(@Body() dto: CreateUserDto): Promise<MessageResponse> {
		return await this.authService.register(dto);
	}

	@IsPublic()
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Log in a user and create a session' })
	@Post('login')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS)
	@HttpCode(HttpStatus.OK)
	public async login(
		@Body() dto: LoginDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const clientInfo = extractClientInfo(req);
		const { accessToken, refreshToken } = await this.authService.login(
			dto,
			clientInfo,
		);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS;
	}

	@IsPublic()
	@ApiOperation({ summary: 'Log out the current user' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') rt: string | undefined,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		if (rt) await this.authService.logout(rt, userId);

		clearAuthCookies(res, this.configService);

		return SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS;
	}

	@ApiOperation({ summary: 'Verify user email address' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.AUTH.ALREADY_VERIFIED,
		ERROR_MESSAGES.TOKEN.INVALID,
		ERROR_MESSAGES.TOKEN.EXPIRED,
	])
	@Get('verify-email')
	public async verifyEmail(
		@Query('token') token: string,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const info = extractClientInfo(req);
		const result = await this.authService.verifyEmail(token, info);

		const { accessToken, refreshToken } = result;

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED;
	}

	@IsPublic()
	@SkipThrottle()
	@Post('refresh')
	@ApiOperation({ summary: 'Refresh authentication tokens' })
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.REFRESH_TOKENS)
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Req() req: Request,
		@Cookie('refreshToken') rt: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		try {
			if (!rt)
				throw new UnauthorizedException(
					ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
				);
			const info = extractClientInfo(req);
			const { accessToken, refreshToken } =
				await this.authService.refreshTokens(rt, info);
			setAuthCookies(res, accessToken, refreshToken, this.configService);
			return SUCCESS_MESSAGES.AUTH.REFRESH_TOKENS;
		} catch (error) {
			clearAuthCookies(res, this.configService);
			throw error;
		}
	}

	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Resend verification email to user' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL,
	)
	@Post('resend-verification-email')
	@HttpCode(HttpStatus.OK)
	public async resendVerificationEmail(
		@Body() dto: ResendVerificationEmailDto,
	) {
		await this.authService.resendVerification(dto.email);

		return SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL;
	}

	@IsPublic()
	@ApiOperation({ summary: 'Get current user profile' })
	@Auth()
	@ApiOkResponse({ type: UserWithoutPasswordDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.USER.DELETED,
	])
	@Get('me')
	public async getProfile(@Authorized('id') userId: string) {
		if (!userId)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED);

		return await this.userService.findById(userId);
	}

	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Request a password reset link' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.DELETED)
	@Post('forgot-password')
	public async forgotPassword(
		@Body() dto: ForgotPasswordDto,
	): Promise<MessageResponse> {
		await this.authService.forgotPassword(dto.email);

		return SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD;
	}

	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('reset-password')
	@ApiOperation({ summary: 'Reset user password' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.RESET_PASSWORD)
	public async resetPassword(
		@Body() dto: ResetPasswordDto,
	): Promise<MessageResponse> {
		await this.authService.resetPassword(dto);

		return SUCCESS_MESSAGES.AUTH.RESET_PASSWORD;
	}

	@Auth()
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Change user password' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		withField(ERROR_MESSAGES.AUTH.OLD_PASSWORD_INCORRECT, 'oldPassword'),
	)
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
	)
	@Post('change-password')
	public async changePassword(
		@Authorized('id') userId: string,
		@Body() dto: ChangePasswordDto,
	): Promise<MessageResponse> {
		await this.authService.changePassword(userId, dto);

		return SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD;
	}

	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Generate account restore token' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.AUTH.SEND_RESTORE_ACCOUNT_EMAIL,
	)
	@Post('generate-restore-token')
	public async generateRestoreToken(
		@Body() dto: RestoreAccountDto,
	): Promise<MessageResponse> {
		await this.authService.generateRestoreAccountToken(dto.email);

		return SUCCESS_MESSAGES.AUTH.SEND_RESTORE_ACCOUNT_EMAIL;
	}

	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@ApiOperation({ summary: 'Generate account restore token' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.RESTORE_ACCOUNT)
	@Post('restore-account')
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.TOKEN.INVALID,
		ERROR_MESSAGES.TOKEN.EXPIRED,
	])
	public async restoreAccount(
		@Query('token') token: string,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const info = extractClientInfo(req);

		const { accessToken, refreshToken } = await this.authService.restoreAccount(
			token,
			info,
		);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.AUTH.RESTORE_ACCOUNT;
	}
}
