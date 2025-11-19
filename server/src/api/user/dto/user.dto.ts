import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty({ example: '22ee1ae1-d8e9-45d2-906c-b7846eee5eaa' })
	id: string;

	@ApiProperty({ example: 'user@example.com' })
	email: string;

	@ApiProperty({ example: 'hashedpassword123', required: false })
	password?: string;

	@ApiProperty({ example: true })
	emailVerified: boolean;

	@ApiProperty({ example: 'USER' })
	role: string;

	@ApiProperty({ example: new Date().toISOString() })
	createdAt: Date;

	@ApiProperty({ example: new Date().toISOString() })
	updatedAt: Date;
}

export class UserWithoutPasswordDto extends OmitType(UserDto, [
	'password',
	'updatedAt',
]) {}
