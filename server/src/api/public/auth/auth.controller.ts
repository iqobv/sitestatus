import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized, Cookie } from '@libs/decorators';
import {
	clearAuthCookies,
	createCustomMessageDto,
	extractClientInfo,
	setAuthCookies,
} from '@libs/utils';
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
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { CreateUserDto, UserWithoutPasswordDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import {
	ChangePasswordDto,
	ForgotPasswordDto,
	LoginDto,
	RegisterMessageDto,
	ResendVerificationEmailDto,
	ResetPasswordDto,
	VerifyEmailDto,
} from './dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@Throttle({ strict: { limit: 5, ttl: 60000 } })
	@ApiOperation({ summary: 'Register a new user' })
	@ApiOkResponse({ type: RegisterMessageDto })
	@ApiConflictResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.USER.USER_ALREADY_EXISTS),
	})
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto);
	}

	@Throttle({ strict: { limit: 5, ttl: 60000 } })
	@ApiOperation({ summary: 'Log in a user and create a session' })
	@Post('login')
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS),
	})
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() dto: LoginDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const clientInfo = extractClientInfo(req);
		const tokens = await this.authService.login(dto, clientInfo);
		setAuthCookies(
			res,
			tokens.accessToken,
			tokens.refreshToken,
			this.configService,
		);
		return SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS;
	}

	@ApiOperation({ summary: 'Log out the current user' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') rt: string | undefined,
		@Res({ passthrough: true }) res: Response,
	) {
		if (rt) await this.authService.logout(rt, userId);

		clearAuthCookies(res, this.configService);
		return true;
	}

	@ApiOperation({ summary: 'Verify user email address' })
	@ApiOkResponse({ type: VerifyEmailDto })
	@ApiBadRequestResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN),
	})
	@Get('verify-email')
	async verifyEmail(
		@Query('token') token: string,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const info = extractClientInfo(req);
		const result = await this.authService.verifyEmail(token, info);

		const { tokens, ...rest } = result;

		setAuthCookies(
			res,
			tokens.accessToken,
			tokens.refreshToken,
			this.configService,
		);

		return { ...rest };
	}

	@Throttle({ strict: { limit: 10, ttl: 60000 } })
	@Post('refresh')
	@ApiOperation({ summary: 'Refresh authentication tokens' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.AUTH.REFRESH_TOKENS),
	})
	@HttpCode(HttpStatus.OK)
	async refresh(
		@Req() req: Request,
		@Cookie('refreshToken') rt: string,
		@Res({ passthrough: true }) res: Response,
	) {
		if (!rt) throw new UnauthorizedException('Refresh token missing');
		const info = extractClientInfo(req);
		const tokens = await this.authService.refreshTokens(rt, info);
		setAuthCookies(
			res,
			tokens.accessToken,
			tokens.refreshToken,
			this.configService,
		);
		return SUCCESS_MESSAGES.AUTH.REFRESH_TOKENS;
	}

	@Throttle({ strict: { limit: 3, ttl: 60000 } })
	@ApiOperation({ summary: 'Resend verification email to user' })
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.AUTH.RESEND_VERIFICATION_EMAIL,
		),
	})
	@Post('resend-verification-email')
	@HttpCode(HttpStatus.OK)
	async resendVerificationEmail(@Body() dto: ResendVerificationEmailDto) {
		return await this.authService.resendVerification(dto.email);
	}

	@ApiOperation({ summary: 'Get current user profile' })
	@Auth()
	@ApiOkResponse({ type: UserWithoutPasswordDto })
	@Get('me')
	async getProfile(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}

	@Throttle({ strict: { limit: 3, ttl: 60000 } })
	@ApiOperation({ summary: 'Request a password reset link' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD),
	})
	@Post('forgot-password')
	async forgotPassword(@Body() dto: ForgotPasswordDto) {
		await this.authService.forgotPassword(dto.email);
		return SUCCESS_MESSAGES.AUTH.FORGOT_PASSWORD;
	}

	@Post('reset-password')
	@ApiOperation({ summary: 'Reset user password' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.AUTH.RESET_PASSWORD),
	})
	async resetPassword(@Body() dto: ResetPasswordDto) {
		await this.authService.resetPassword(dto);
		return SUCCESS_MESSAGES.AUTH.RESET_PASSWORD;
	}

	@Auth()
	@ApiOperation({ summary: 'Change user password' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD),
	})
	@ApiBadRequestResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS),
	})
	@Post('change-password')
	async changePassword(
		@Authorized('id') userId: string,
		@Body() dto: ChangePasswordDto,
	) {
		await this.authService.changePassword(userId, dto);
		return SUCCESS_MESSAGES.AUTH.CHANGE_PASSWORD;
	}
}
