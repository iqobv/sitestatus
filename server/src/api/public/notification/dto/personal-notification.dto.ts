import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreatePersonalNotificationDto } from './create-personal-notification.dto';

export class PersonalNotificationDto extends IntersectionType(
	DefaultFieldsDto,
	CreatePersonalNotificationDto,
) {
	@ApiProperty({ example: false })
	isRead: boolean;
}
