import { IsPassword } from '@libs/validators/is-password.validator';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@IsPassword()
	@IsOptional()
	password?: string;

	@IsBoolean()
	@IsOptional()
	emailVerified?: boolean;
}
