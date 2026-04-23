import { SiteStatus } from '@generated/turso/enums';
import { IsEmpty, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class PingResultDto {
	@IsUUID('4')
	monitorId: string;

	@IsEnum(SiteStatus)
	status: SiteStatus;

	@IsEmpty()
	@IsNumber()
	statusCode: number | null;

	@IsNumber()
	responseTimeMs: number;

	@IsEmpty()
	@IsString()
	errorMessage: string | null;

	@IsString()
	region: string;
}
