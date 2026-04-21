import { IsDate, IsEnum, IsUUID } from 'class-validator';
import { TokenType } from 'generated/prisma/enums';

export class CreateTokenDto {
	@IsUUID('4')
	userId: string;

	@IsEnum(TokenType)
	type: TokenType;

	@IsDate()
	expiresAt: Date;
}
