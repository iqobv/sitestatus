import { IsPassword } from '@libs/validators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
	@ApiProperty({ example: 'oldpassword123' })
	@IsString()
	@IsNotEmpty()
	oldPassword: string;

	@ApiProperty({ example: 'newpassword456' })
	@IsPassword()
	@IsNotEmpty()
	newPassword: string;
}
