import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Patch,
	Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CookieService } from '../auth/cookie/cookie.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPasswordDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly cookieService: CookieService,
	) {}

	/** Update user information */
	@Auth()
	@ApiOkResponse({ type: UserWithoutPasswordDto })
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.USER.ALREADY_EXISTS)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.USER.DELETED,
	])
	@Patch(':id')
	public async update(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto,
	): Promise<UserWithoutPasswordDto> {
		return await this.userService.update(userId, dto);
	}

	/** Remove user account */
	@Auth()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.USER.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.USER.DELETED,
	])
	@Delete()
	public async removeAccount(
		@Authorized('id') userId: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		await this.userService.removeAccount(userId);

		this.cookieService.clearAuthCookies(res);

		return SUCCESS_MESSAGES.USER.DELETED;
	}
}
