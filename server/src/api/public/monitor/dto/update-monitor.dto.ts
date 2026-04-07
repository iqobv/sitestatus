import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { CreateMonitorDto } from './create-monitor.dto';

export class UpdateMonitorDto extends PartialType(CreateMonitorDto) {
	@ApiProperty({ example: new Date().toISOString() })
	@IsDate()
	@IsOptional()
	nextCheckAt?: Date;
}
