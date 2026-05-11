import { NotificationType } from '@generated/postgres/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto extends DefaultFieldsDto {
	@ApiProperty({
		example: NotificationType.INCIDENT,
		enum: NotificationType,
	})
	type: NotificationType;

	@ApiProperty({ example: false })
	isRead: boolean;

	@ApiProperty({ example: false })
	isGlobal: boolean;

	@ApiProperty({ example: 'New Incident' })
	title: string;

	@ApiProperty({ example: 'We detected a new incident.' })
	message: string;

	@ApiProperty({ example: 'https://example.com/incident/123' })
	actionUrl?: string | null;
}

export class UserNotificationsDto {
	@ApiProperty({ type: [NotificationDto] })
	notifications: NotificationDto[];

	@ApiProperty({ example: true })
	hasUnread: boolean;

	@ApiProperty({ example: 5 })
	countUnread: number;
}
