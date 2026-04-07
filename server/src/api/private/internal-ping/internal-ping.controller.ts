import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WorkerAuthGuard } from 'src/libs/guards';
import { PingResultDto } from './dto';
import { InternalPingService } from './internal-ping.service';

@Controller('internal/ping')
export class InternalPingController {
	constructor(private readonly internalPingService: InternalPingService) {}

	@UseGuards(WorkerAuthGuard)
	@Get('tasks')
	async getTasks(@Param('region') region: string) {
		return await this.internalPingService.getTasks(region);
	}

	@UseGuards(WorkerAuthGuard)
	@Post('results')
	async saveResults(@Body() results: PingResultDto[]) {
		return await this.internalPingService.saveResults(results);
	}
}
