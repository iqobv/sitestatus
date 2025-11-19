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
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateUserDto, UserWithoutPasswordDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import {
	AccessTokenWithUserDto,
	LoginDto,
	RegisterMessageDto,
	ResendVerificationEmailDto,
	ResendVerificationEmailMessageDto,
	VerifyEmailDto,
} from './dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@ApiOperation({ summary: 'Register a new user' })
	@ApiOkResponse({ type: RegisterMessageDto })
	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto);
	}

	@ApiOperation({ summary: 'Verify user email address' })
	@ApiOkResponse({ type: VerifyEmailDto })
	@Get('verify-email')
	async verifyEmail(
		@Query('userId') userId: string,
		@Query('token') token: string,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.verifyEmail(userId, token, res);
	}

	@ApiOperation({ summary: 'Resend verification email to user' })
	@ApiOkResponse({ type: ResendVerificationEmailMessageDto })
	@Post('resend-verification-email')
	@HttpCode(HttpStatus.OK)
	async resendVerificationEmail(@Body() dto: ResendVerificationEmailDto) {
		return await this.authService.resendVerificationEmail(dto.email);
	}

	@ApiOperation({ summary: 'Log in a user and create a session' })
	@Post('login')
	@ApiOkResponse({ type: AccessTokenWithUserDto })
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.login(dto, res);
	}

	@ApiOperation({ summary: 'Log out the current user' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(req, res);
	}

	@ApiOperation({ summary: 'Refresh access and refresh tokens' })
	@Post('refresh')
	@ApiOkResponse({ type: AccessTokenWithUserDto })
	@HttpCode(HttpStatus.OK)
	async refreshTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.refreshTokens(req, res);
	}

	@ApiOperation({ summary: 'Get current user profile' })
	@Auth()
	@ApiOkResponse({ type: UserWithoutPasswordDto })
	@Get('me')
	async getProfile(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}
}
