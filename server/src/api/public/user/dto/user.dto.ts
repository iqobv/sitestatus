import { OmitType } from '@nestjs/swagger';
import { UserEntityDto } from './user.entity.dto';

export class UserDto extends UserEntityDto {}

export class UserWithoutPasswordDto extends OmitType(UserEntityDto, [
	'password',
] as const) {}
