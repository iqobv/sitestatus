import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class GetHierarchyQueryDto {
	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsOptional()
	@IsUUID('4')
	projectId?: string;

	@ApiProperty({ example: null, required: false })
	@IsOptional()
	@IsUUID('4')
	monitorId?: string;
}
