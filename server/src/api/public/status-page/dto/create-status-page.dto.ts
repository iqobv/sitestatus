import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsOptional, IsString, MinLength } from 'class-validator';
import { StatusPageMonitorDto } from './status-page-monitor.dto';

export class CreateStatusPageDto {
	@ApiProperty({ example: 'my-status-page' })
	@MinLength(3)
	@IsString()
	slug: string;

	@ApiProperty({ example: 'My Status Page' })
	@MinLength(3)
	@IsString()
	title: string;

	@ApiProperty({ example: 'Description of the status page' })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({ type: [StatusPageMonitorDto] })
	@ArrayMinSize(1)
	@Type(() => StatusPageMonitorDto)
	monitors: StatusPageMonitorDto[];
}
