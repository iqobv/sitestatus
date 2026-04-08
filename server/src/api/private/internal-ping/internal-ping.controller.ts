import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WorkerAuthGuard } from 'src/libs/guards';
import { PingResultDto } from './dto';
import { InternalPingService } from './internal-ping.service';

@Controller('internal/ping')
export class InternalPingController {
	constructor(private readonly internalPingService: InternalPingService) {}

	@UseGuards(WorkerAuthGuard)
	@Get('tasks')
	async getTasks(@Query('region') region: string) {
		return await this.internalPingService.getTasks(region);
	}

	@UseGuards(WorkerAuthGuard)
	@Post('results')
	async saveResults(
		@Body() results: PingResultDto[],
		@Query('region') region: string,
	) {
		return await this.internalPingService.saveResults(results, region);
	}
}
