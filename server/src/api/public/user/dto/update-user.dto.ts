import { UserRole } from '@generated/postgres/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';

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
}

export class InternalUpdateUserDto extends UpdateUserDto {
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
