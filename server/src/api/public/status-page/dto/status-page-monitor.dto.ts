import { BaseMonitorDto } from '@api/public/monitor/dto/monitor.dto';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { IntersectionType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Min,
	MinLength,
} from 'class-validator';

export class StatusPageMonitorDto {
	@Expose()
	@IsUUID('4')
	id: string;

	@Expose()
	@IsOptional()
	@IsString()
	@MinLength(3)
	displayName?: string | null;

	@Expose()
	@IsNumber()
	@Min(0)
	sortOrder: number;
}

export class FullStatusPageMonitorDto extends IntersectionType(
	StatusPageMonitorDto,
	DefaultFieldsDto,
) {
	@Expose()
	@Type(() => BaseMonitorDto)
	monitor: BaseMonitorDto;

	@Expose() statusPageId: string;
	@Expose() monitorId: string;
}
