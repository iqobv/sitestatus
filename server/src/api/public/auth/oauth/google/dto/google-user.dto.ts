import { IsEmail, IsString } from 'class-validator';

export class GoogleUserDto {
	@IsString()
	googleId: string;

	@IsEmail()
	email: string;
}
