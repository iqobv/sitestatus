import { Controller } from '@nestjs/common';
import { AlertSettingsService } from './alert-settings.service';

@Controller('alert-settings')
export class AlertSettingsController {
	constructor(private readonly alertSettingsService: AlertSettingsService) {}
}
