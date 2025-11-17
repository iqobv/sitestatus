import { ApiProperty } from '@nestjs/swagger';
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';
import { SiteStatus } from 'generated/prisma/enums';

export class CreatePingResultDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	@IsUUID('4')
	monitorId: string;

	@ApiProperty({ example: SiteStatus.UP })
	@IsEnum(SiteStatus)
	status: SiteStatus;

	@ApiProperty({ example: 200, required: false })
	@IsNumber()
	@IsOptional()
	statusCode: number | null;

	@ApiProperty({ example: 123, required: false })
	@IsNumber()
	@IsOptional()
	responseTimeMs: number | null;

	@ApiProperty({ example: 'Timeout error', required: false })
	@IsString()
	@IsOptional()
	errorMessage: string | null;
}
