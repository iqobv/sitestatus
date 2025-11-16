import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

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
	@MinLength(6)
	@IsOptional()
	password?: string;
}
