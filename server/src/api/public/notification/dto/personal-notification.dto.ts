import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreatePersonalNotificationDto } from './create-personal-notification.dto';

export class PersonalNotificationDto extends IntersectionType(
	DefaultFieldsDto,
	CreatePersonalNotificationDto,
) {
	@ApiProperty({ example: false })
	isRead: boolean;
}
