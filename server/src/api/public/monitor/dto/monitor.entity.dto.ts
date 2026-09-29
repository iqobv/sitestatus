import { BaseRegionDto } from '@api/public/region/dto/base-region.dto';
import { SiteStatus } from '@generated/engine/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MonitorTimelineDto } from './monitor-timeline.dto';

export class MonitorEntityDto extends DefaultFieldsDto {
	@Expose() name: string;
	@Expose() url: string;
	@Expose() checkIntervalSeconds: number;
	@Expose() method: string;
	@Expose() isActive: boolean;
	@Expose() projectId: string | null;
	@Expose() userId: string;
	@Expose() nextCheckAt: Date;
	@Expose() lastCheckedAt: Date | null;
	@Expose() deletedAt: Date | null;

	@ApiProperty({
		example: SiteStatus.UP,
		enum: SiteStatus,
		enumName: 'SiteStatus',
	})
	@Expose()
	lastStatus: SiteStatus;

	@Expose() uptime: string;

	@Expose()
	@Type(() => MonitorTimelineDto)
	timeline: MonitorTimelineDto[];

	@Expose()
	@Type(() => BaseRegionDto)
	regions: BaseRegionDto[];

	/** @example ['4a57d2bb-65d3-46d8-b1a0-cd17af9c78a6', '26e71e00-8aff-4263-83c8-e06363bfba40'] */
	@Expose()
	regionIds: string[];
}
