import { OmitType } from '@nestjs/swagger';
import { NotificationEntityDto } from './notification.entity.dto';

export class GlobalNotificationEntityDto extends OmitType(
	NotificationEntityDto,
	['isRead', 'userId'] as const,
) {}
