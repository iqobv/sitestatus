import type { ClientInfo } from '@libs/types';
import { IsDate, IsObject, IsString, IsUUID } from 'class-validator';

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
