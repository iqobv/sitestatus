import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Cookie } from '@libs/decorators/cookie.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { extractClientInfo } from '@libs/utils/client-info.util';
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
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserWithoutPasswordDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CookieService } from './cookie/cookie.service';
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
		private readonly cookieService: CookieService,
	) {}

	/** Register a new user */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('register')
	@ApiSuccessResponse(HttpStatus.OK, {
		...SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
		meta: { email: 'user@example.com' },
	})
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.USER.ALREADY_EXISTS)
	@HttpCode(HttpStatus.CREATED)
	public async register(@Body() dto: CreateUserDto): Promise<MessageResponse> {
		return await this.authService.register(dto);
	}

	/** Log in a user */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
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

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

		return SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS;
	}

	/** Log out a user */
	@Auth()
	@Post('logout')
	@ApiOkResponse({ type: Boolean })
	@HttpCode(HttpStatus.OK)
	public async logout(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') rt: string | undefined,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		if (rt) await this.authService.logout(rt, userId);

		this.cookieService.clearAuthCookies(res);

		return SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS;
	}

	/** Verify email address */
	@Get('verify-email')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.AUTH.ALREADY_VERIFIED,
		ERROR_MESSAGES.TOKEN.INVALID,
		ERROR_MESSAGES.TOKEN.EXPIRED,
	])
	public async verifyEmail(
		@Query('token') token: string,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const info = extractClientInfo(req);
		const result = await this.authService.verifyEmail(token, info);

		const { accessToken, refreshToken } = result;

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

		return SUCCESS_MESSAGES.AUTH.EMAIL_VERIFIED;
	}

	/** Refresh authentication tokens */
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

			this.cookieService.setAuthCookies(res, accessToken, refreshToken);

			return SUCCESS_MESSAGES.AUTH.REFRESH_TOKENS;
		} catch (error) {
			this.cookieService.clearAuthCookies(res);
			throw error;
		}
	}

	/** Resend verification email */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('resend-verification-email')
	@ApiOperation({ summary: 'Resend verification email to user' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL,
	)
	@HttpCode(HttpStatus.OK)
	public async resendVerificationEmail(
		@Body() dto: ResendVerificationEmailDto,
	): Promise<MessageResponse> {
		await this.authService.resendVerification(dto.email);

		return SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL;
	}

	/** Get current user */
	@Get('me')
	@Auth()
	@ApiOkResponse({ type: UserWithoutPasswordDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.USER.DELETED,
	])
	public async getProfile(
		@Authorized('id') userId: string,
	): Promise<UserWithoutPasswordDto> {
		if (!userId)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED);

		return await this.userService.findById(userId);
	}

	/** Request a password reset link */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('forgot-password')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.DELETED)
	public async forgotPassword(
		@Body() dto: ForgotPasswordDto,
	): Promise<MessageResponse> {
		await this.authService.forgotPassword(dto.email);

		return SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD;
	}

	/** Reset user password */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('reset-password')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.RESET_PASSWORD)
	public async resetPassword(
		@Body() dto: ResetPasswordDto,
	): Promise<MessageResponse> {
		await this.authService.resetPassword(dto);

		return SUCCESS_MESSAGES.AUTH.RESET_PASSWORD;
	}

	/** Change user password */
	@Auth()
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('change-password')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		withField(ERROR_MESSAGES.AUTH.OLD_PASSWORD_INCORRECT, 'oldPassword'),
	)
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
	)
	public async changePassword(
		@Authorized('id') userId: string,
		@Body() dto: ChangePasswordDto,
	): Promise<MessageResponse> {
		await this.authService.changePassword(userId, dto);

		return SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD;
	}

	/** Generate account restore token */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('generate-restore-token')
	@ApiOperation({ summary: 'Generate account restore token' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.AUTH.SEND_RESTORE_ACCOUNT_EMAIL,
	)
	public async generateRestoreToken(
		@Body() dto: RestoreAccountDto,
	): Promise<MessageResponse> {
		await this.authService.generateRestoreAccountToken(dto.email);

		return SUCCESS_MESSAGES.AUTH.SEND_RESTORE_ACCOUNT_EMAIL;
	}

	/** Generate account restore token */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		default: { limit: 5, ttl: 60000 },
	})
	@Post('restore-account')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.RESTORE_ACCOUNT)
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

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

		return SUCCESS_MESSAGES.AUTH.RESTORE_ACCOUNT;
	}
}
