import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class CreateSessionDto {
	@IsUUID('4')
	userId: string;

	@IsString()
	refreshTokenHash: string;

	@Type(() => ClientInfoDto)
	clientInfo: ClientInfoDto;

	@IsDate()
	expiresAt: Date;
}
