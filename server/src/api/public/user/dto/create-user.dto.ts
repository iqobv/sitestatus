import { IsPassword } from '@libs/validators/is-password.validator';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class PublicCreateUserDto {
	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	@IsPassword()
	@IsOptional()
	password?: string;
}

export class CreateUserDto extends PublicCreateUserDto {
	@IsBoolean()
	@IsOptional()
	emailVerified?: boolean;
}
