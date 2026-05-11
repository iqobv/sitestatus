import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { FullStatusPageMonitorWithMonitorDto } from './status-page-monitor.dto';

export class StatusPageDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'user-1' })
	userId: string;

	@ApiProperty({ example: 'my-status-page' })
	slug: string;

	@ApiProperty({ example: 'My Status Page' })
	title: string;

	@ApiProperty({ example: 'This is my status page.' })
	description: string | null;

	@ApiProperty({ example: true })
	isPublished: boolean;

	@ApiProperty({ example: 'https://status.example.com' })
	customDomain: string | null;

	@ApiProperty({ example: 'https://example.com/icon.png' })
	iconUrl: string | null;
}

export class FullStatusPageDto extends StatusPageDto {
	@ApiProperty({ type: [FullStatusPageMonitorWithMonitorDto] })
	monitors: FullStatusPageMonitorWithMonitorDto[];
}
