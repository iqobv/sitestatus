import { IsPassword } from '@libs/validators/is-password.validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
	@IsString()
	@IsNotEmpty()
	token: string;

	@IsPassword()
	@IsString()
	@IsNotEmpty()
	newPassword: string;
}
