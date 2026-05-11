import { SiteStatus } from '@generated/turso/enums';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class IncidentAlertDto {
	@IsString()
	monitorName: string;

	@IsUUID('4')
	monitorId: string;

	@IsUUID('4')
	regionId: string;

	@IsUUID('4')
	incidentId: string;

	@IsEnum(SiteStatus)
	status: SiteStatus;

	@IsString()
	@IsOptional()
	errorMessage?: string | null;

	@IsString()
	@IsOptional()
	statusCode?: number | null;

	@IsDate()
	createdAt: Date;

	@IsDate()
	@IsOptional()
	resolvedAt: Date | null;

	@IsOptional()
	regions?: RegionInfoDto[];
}

export class RegionInfoDto {
	@IsUUID('4')
	id: string;

	@IsString()
	name: string;
}
