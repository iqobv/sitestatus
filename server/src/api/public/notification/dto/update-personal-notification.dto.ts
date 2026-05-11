import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePersonalNotificationDto } from './create-personal-notification.dto';

export class UpdatePersonalNotificationDto extends PartialType(
	OmitType(CreatePersonalNotificationDto, ['userId'] as const),
) {}
