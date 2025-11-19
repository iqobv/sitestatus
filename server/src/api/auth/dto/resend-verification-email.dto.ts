import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResendVerificationEmailDto {
	@ApiProperty({ example: 'user@example.com' })
	@IsEmail()
	@IsString()
	email: string;
}
