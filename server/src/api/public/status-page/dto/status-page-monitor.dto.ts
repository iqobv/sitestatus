import { BaseMonitorDto } from '@api/public/monitor/dto';
import { DefaultFieldsDto } from '@libs/dto';
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
	displayName?: string;

	@ApiProperty({ example: 0 })
	@IsNumber()
	@Min(0)
	sortOrder: number;
}

export class FullStatusPageMonitorDto extends IntersectionType(
	StatusPageMonitorDto,
	DefaultFieldsDto,
) {
	@ApiProperty({ example: 'status-page-1' })
	statusPageId: string;

	@ApiProperty({ example: 'monitor-1' })
	monitorId: string;
}

export class FullStatusPageMonitorWithMonitorDto extends FullStatusPageMonitorDto {
	@ApiProperty({ type: BaseMonitorDto })
	monitor: BaseMonitorDto;
}
