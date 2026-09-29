import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller({
	version: VERSION_NEUTRAL,
})
export class AppController {
	@Get('health')
	health() {
		return 'OK';
	}
}
