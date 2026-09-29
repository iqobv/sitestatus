import { NotificationChannelDto } from '@api/public/notification-channel/dto/notification-channel.dto';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose, Type } from 'class-transformer';

export class AlertSettingsEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() projectId: string | null;
	@Expose() monitorId: string | null;
	@Expose() isEnabled: boolean;
	@Expose() onDown: boolean;
	@Expose() onUp: boolean;
	@Expose() delay: number;

	@Expose()
	@Type(() => NotificationChannelDto)
	channels: NotificationChannelDto[];
}
