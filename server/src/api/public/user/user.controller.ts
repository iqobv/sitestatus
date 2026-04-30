import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized } from '@libs/decorators';
import { clearAuthCookies, createCustomMessageDto } from '@libs/utils';
import { Body, Controller, Delete, Patch, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@Auth()
	@ApiOperation({
		summary: 'Update user information',
		description: 'Updates the information of an existing user',
	})
	@ApiOkResponse({ type: UserDto })
	@ApiConflictResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.USER.USER_ALREADY_EXISTS),
	})
	@Patch(':id')
	async update(@Authorized('id') userId: string, @Body() dto: UpdateUserDto) {
		return await this.userService.update(userId, dto);
	}

	@Auth()
	@ApiOperation({
		summary: 'Delete user account',
		description: 'Deletes a user account permanently',
	})
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.USER.USER_DELETED),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.USER.USER_NOT_FOUND),
	})
	@Delete()
	async removeAccount(
		@Authorized('id') userId: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const result = await this.userService.removeAccount(userId);

		clearAuthCookies(res, this.configService);

		return result;
	}
}
