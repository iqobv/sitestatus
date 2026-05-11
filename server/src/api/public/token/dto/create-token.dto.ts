import { TokenType } from '@generated/postgres/enums';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateTokenDto {
	@IsUUID('4')
	userId: string;

	@IsEnum(TokenType)
	type: TokenType;

	@IsDate()
	expiresAt: Date;

	@IsUUID('4')
	@IsOptional()
	channelId?: string;
}
