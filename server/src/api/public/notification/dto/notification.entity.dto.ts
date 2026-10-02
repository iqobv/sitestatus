import { NotificationType } from '@generated/postgres/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;

	@ApiProperty({
		enum: NotificationType,
		enumName: 'NotificationType',
	})
	@Expose()
	type: NotificationType;

	@Expose() isRead: boolean;
	@Expose() isAppNotification: boolean;
	@Expose() isEmailNotification: boolean;
	@Expose() title: string;
	@Expose() message: string;
	@Expose() actionUrl?: string | null;
}
