import { IsString, IsUUID } from 'class-validator';

export class CreateUserProviderDto {
	@IsString()
	@IsUUID('4')
	userId: string;

	@IsString()
	provider: string;

	@IsString()
	providerId: string;
}
