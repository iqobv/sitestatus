import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { IntersectionType } from '@nestjs/swagger';
import { CreateGlobalNotificationDto } from './create-global-notification.dto';

export class GlobalNotificationDto extends IntersectionType(
	DefaultFieldsDto,
	CreateGlobalNotificationDto,
) {}
