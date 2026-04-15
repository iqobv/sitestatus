import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'generated/prisma/enums';

export class UpdateUserDto {
	@ApiProperty({
		description: 'The email of the user',
		example: 'user@gmail.com',
		required: false,
	})
	@IsEmail(
		{ host_whitelist: ['gmail.com'] },
		{ message: 'Invalid email format. Only gmail.com is allowed.' },
	)
	@IsOptional()
	email?: string;

	@ApiProperty({
		description: 'Indicates whether the user email is verified',
		example: true,
		required: false,
	})
	@IsBoolean()
	@IsOptional()
	emailVerified?: boolean;

	@ApiProperty({
		description: 'The role of the user',
		example: UserRole.USER,
		required: false,
	})
	@IsEnum(UserRole)
	@IsOptional()
	role?: UserRole;
}
