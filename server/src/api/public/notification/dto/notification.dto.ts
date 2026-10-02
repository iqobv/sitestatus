import { Expose, Type } from 'class-transformer';
import { NotificationEntityDto } from './notification.entity.dto';

export class NotificationDto extends NotificationEntityDto {}

export class UserNotificationsDto {
	@Expose()
	@Type(() => NotificationDto)
	notifications: NotificationDto[];

	@Expose() hasUnread: boolean;
	@Expose() countUnread: number;
	@Expose() hasNextPage: boolean;
}
