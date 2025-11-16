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
import { ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateUserDto, UserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto);
	}

	@Get('verify-email')
	async verifyEmail(
		@Query('userId') userId: string,
		@Query('token') token: string,
	) {
		return await this.authService.verifyEmail(userId, token);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.login(dto, res);
	}

	@Auth()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(req, res);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		return await this.authService.refreshTokens(req, res);
	}

	@Auth()
	@ApiOkResponse({ type: UserDto })
	@Get('me')
	async getProfile(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}
}
