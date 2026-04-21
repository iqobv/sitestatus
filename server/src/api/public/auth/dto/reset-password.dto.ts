import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/libs/validators';

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
