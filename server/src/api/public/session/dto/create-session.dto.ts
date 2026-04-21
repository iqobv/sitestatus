import { IsDate, IsObject, IsString, IsUUID } from 'class-validator';
import type { ClientInfo } from 'src/libs/types';

export class CreateSessionDto {
	@IsUUID('4')
	userId: string;

	@IsString()
	refreshTokenHash: string;

	@IsObject()
	clientInfo: ClientInfo;

	@IsDate()
	expiresAt: Date;
}
