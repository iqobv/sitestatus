import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';

export class MonitorDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	id: string;
	@ApiProperty({ example: 'My Website' })
	name: string;
	@ApiProperty({ example: 'https://example.com' })
	url: string;
	@ApiProperty({ example: 300, description: 'Check interval in seconds' })
	checkIntervalSeconds: number;
	@ApiProperty({ example: new Date().toISOString() })
	nextCheckAt: Date;
	@ApiProperty({ example: new Date().toISOString() })
	lastCheckedAt?: Date;
	@ApiProperty({ example: SiteStatus.UP })
	lastStatus?: SiteStatus;
	@ApiProperty({ example: true })
	isActive?: boolean;
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	userId: string;
	@ApiProperty({ example: new Date().toISOString() })
	createdAt: Date;
	@ApiProperty({ example: new Date().toISOString() })
	updatedAt: Date;
}
