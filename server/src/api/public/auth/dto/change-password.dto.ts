import { IsPassword } from '@libs/validators/is-password.validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	@IsString()
	@IsNotEmpty()
	oldPassword: string;

	@IsPassword()
	@IsNotEmpty()
	newPassword: string;
}
