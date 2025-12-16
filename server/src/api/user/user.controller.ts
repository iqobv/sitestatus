import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Update user information' })
	@ApiOkResponse({ type: UserDto })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return await this.userService.update(id, dto);
	}
}
