import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'example@example.com' })
	@IsString()
	@IsEmail(
		{ host_whitelist: ['gmail.com'] },
		{ message: 'Invalid email format. Only gmail.com is allowed.' },
	)
	email: string;

	@ApiProperty({ example: 'strongpassword', required: false })
	@IsString()
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0,
		},
		{
			message:
				'Password is not strong enough. It must be at least 8 characters long and include lowercase, uppercase, and numeric characters.',
		},
	)
	@IsOptional()
	password?: string;
}
