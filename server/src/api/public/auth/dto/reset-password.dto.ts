import { IsPassword } from '@libs/validators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
	@ApiProperty({ example: 'example-token' })
	@IsString()
	@IsNotEmpty()
	token: string;

	@ApiProperty({ example: 'newpassword456' })
	@IsPassword()
	@IsString()
	@IsNotEmpty()
	newPassword: string;
}
