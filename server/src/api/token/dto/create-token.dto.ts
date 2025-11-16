import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TokenType } from 'generated/prisma/enums';

export class CreateTokenDto {
	@IsUUID('4')
	@IsOptional()
	userId?: string;

	@IsEnum(TokenType)
	type: TokenType;

	@IsDate()
	expiresAt: Date;

	@IsBoolean()
	@IsOptional()
	isSelector?: boolean;
}
