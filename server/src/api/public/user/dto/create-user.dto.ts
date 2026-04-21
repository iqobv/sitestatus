import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsPassword } from 'src/libs/validators';

export class CreateUserDto {
	@ApiProperty({ example: 'example@example.com' })
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'strongpassword', required: false })
	@IsString()
	@IsPassword()
	@IsOptional()
	password?: string;
}
