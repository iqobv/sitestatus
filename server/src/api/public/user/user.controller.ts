import { UserRole } from '@generated/postgres/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { clearAuthCookies } from '@libs/utils/cookie.util';
import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Patch,
	Post,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithoutPasswordDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
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

	@Auth()
	@ApiOperation({
		summary: 'Delete user account',
		description: 'Deletes a user account permanently',
	})
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

		clearAuthCookies(res, this.configService);

		return SUCCESS_MESSAGES.USER.DELETED;
	}

	@Auth(UserRole.ADMIN)
	@Post('initial-data')
	public async createInitialDataForRegisteredUser(): Promise<void> {
		return await this.userService.createInitialDataForRegisteredUser();
	}
}
