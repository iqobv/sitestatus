import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
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
}
