import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
	@ApiProperty({ example: 'user@example.com' })
	@IsEmail(
		{ host_whitelist: ['gmail.com'] },
		{ message: 'Invalid email format. Only gmail.com is allowed.' },
	)
	email: string;

	@ApiProperty({ example: 'strongPassword123' })
	@MinLength(6, { message: 'Password must be at least 6 characters long.' })
	password: string;
}
