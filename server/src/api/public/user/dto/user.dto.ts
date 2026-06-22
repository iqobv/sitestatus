import { UserRole } from '@generated/postgres/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'user@example.com' })
	email: string;

	@ApiProperty({ example: 'hashedpassword123', required: false })
	password?: string | null;

	@ApiProperty({ example: true })
	emailVerified: boolean;

	@ApiProperty({ example: UserRole.USER, enum: UserRole, enumName: 'UserRole' })
	role: UserRole;
}

export class UserWithoutPasswordDto extends OmitType(UserDto, [
	'password',
] as const) {}
