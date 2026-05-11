import { PartialType } from '@nestjs/swagger';
import { CreateGlobalNotificationDto } from './create-global-notification.dto';

export class UpdateGlobalNotificationDto extends PartialType(
	CreateGlobalNotificationDto,
) {}
