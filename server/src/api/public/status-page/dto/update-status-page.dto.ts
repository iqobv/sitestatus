import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateStatusPageDto } from './create-status-page.dto';

export class UpdateStatusPageDto extends PartialType(CreateStatusPageDto) {
	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	isPublished?: boolean;
}
