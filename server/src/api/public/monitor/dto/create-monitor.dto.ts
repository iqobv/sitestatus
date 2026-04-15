import { ApiProperty } from '@nestjs/swagger';
import {
	ArrayNotEmpty,
	IsArray,
	IsBoolean,
	IsDate,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
	Min,
} from 'class-validator';
import { SiteStatus } from 'generated/prisma/enums';

export class CreateMonitorDto {
	@ApiProperty({ example: 'My Website' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'https://example.com' })
	@IsString()
	@IsUrl()
	url: string;

	@ApiProperty({ example: 300, description: 'Check interval in seconds' })
	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
	})
	@Min(300)
	checkIntervalSeconds: number;

	@ApiProperty({ example: new Date().toISOString() })
	@IsDate()
	@IsOptional()
	lastCheckedAt?: Date;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	@IsEnum(SiteStatus)
	@IsOptional()
	lastStatus?: SiteStatus;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isActive?: boolean;

	@ApiProperty({ example: 'f77d8a89-3af8-43d3-91d2-47348ec2ac45' })
	@IsOptional()
	@IsUUID('4')
	projectId?: string;

	@ApiProperty({
		example: [
			'f77d8a89-3af8-43d3-91d2-47348ec2ac45',
			'b88e9b90-4bg9-54e4-02e3-58459fd3bd56',
		],
	})
	@IsArray()
	@ArrayNotEmpty()
	@IsUUID('4', { each: true })
	regions: string[];
}
