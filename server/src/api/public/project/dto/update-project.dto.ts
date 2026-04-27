import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
	@ApiProperty({ example: true })
	@IsOptional()
	@IsBoolean()
	isPublic?: boolean;
}
