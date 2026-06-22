import { BaseMonitorDto } from '@api/public/monitor/dto/monitor.dto';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Min,
	MinLength,
} from 'class-validator';

export class StatusPageMonitorDto {
	@ApiProperty({ example: 'monitor-1' })
	@IsUUID('4')
	id: string;

	@ApiProperty({ example: 'My Monitor' })
	@IsOptional()
	@IsString()
	@MinLength(3)
	displayName?: string | null;

	@ApiProperty({ example: 0 })
	@IsNumber()
	@Min(0)
	sortOrder: number;
}

export class FullStatusPageMonitorDto extends IntersectionType(
	StatusPageMonitorDto,
	DefaultFieldsDto,
) {
	@ApiProperty({ type: BaseMonitorDto })
	monitor: BaseMonitorDto;

	@ApiProperty({ example: 'status-page-1' })
	statusPageId: string;

	@ApiProperty({ example: 'monitor-1' })
	monitorId: string;
}
