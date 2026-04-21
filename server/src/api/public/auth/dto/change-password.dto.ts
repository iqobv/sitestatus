import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/libs/validators';

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
