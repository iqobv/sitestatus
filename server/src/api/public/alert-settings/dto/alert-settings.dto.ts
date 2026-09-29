import { OmitType } from '@nestjs/swagger';
import { AlertSettingsEntityDto } from './alert-settings.entity.dto';

export class AlertSettingsDto extends OmitType(AlertSettingsEntityDto, [
	'channels',
] as const) {}

export class FullAlertSettingsDto extends AlertSettingsEntityDto {}
