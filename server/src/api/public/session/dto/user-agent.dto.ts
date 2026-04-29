import { IsOptional, IsString } from 'class-validator';

export class UserAgentDto {
	@IsString()
	@IsOptional()
	device?: string;

	@IsString()
	@IsOptional()
	os?: string;

	@IsString()
	@IsOptional()
	browser?: string;
}
