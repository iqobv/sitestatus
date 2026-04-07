import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { createCustomMessageDto } from 'src/libs/utils';
import { UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({
		summary: 'Update user information',
		description: 'Updates the information of an existing user',
	})
	@ApiOkResponse({ type: UserDto })
	@ApiConflictResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.USER.USER_ALREADY_EXISTS),
	})
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return await this.userService.update(id, dto);
	}
}
