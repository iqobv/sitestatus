import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseNotificationFieldsDto } from './base-notification-fields.dto';

export class CreatePersonalNotificationDto extends BaseNotificationFieldsDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string;
}
