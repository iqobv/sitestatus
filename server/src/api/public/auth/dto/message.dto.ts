import { ApiProperty } from '@nestjs/swagger';

export class RegisterMessageDto {
	@ApiProperty({
		example: 'Registration successful. Please verify your email.',
	})
	message: string;
	@ApiProperty({ example: 'user@example.com' })
	email: string;
}

export class VerifyEmailDto {
	@ApiProperty({ example: 'Verification email sent successfully.' })
	message: string;
}

export class ResendVerificationEmailMessageDto {
	@ApiProperty({
		example:
			'If an account with that email exists, a verification email has been sent.',
	})
	message: string;
}
