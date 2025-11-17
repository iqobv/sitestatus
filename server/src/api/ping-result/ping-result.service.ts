import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreatePingResultDto } from './dto';

@Injectable()
export class PingResultService {
	private readonly logger = new Logger(PingResultService.name);

	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreatePingResultDto) {
		const { monitorId, status, statusCode, responseTimeMs, errorMessage } = dto;

		const pingResult = await this.prismaService.pingResult.create({
			data: {
				monitor: { connect: { id: monitorId } },
				status,
				statusCode,
				responseTimeMs,
				errorMessage,
			},
		});

		return pingResult;
	}

	async deleteOldResults() {
		const daysToKeep = 90;
		const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

		await this.prismaService.pingResult.deleteMany({
			where: { checkedAt: { lt: cutoffDate } },
		});

		return true;
	}

	@Cron(CronExpression.EVERY_DAY_AT_4AM)
	async handleCronDeleteOldResults() {
		this.logger.log('Deleting old ping results...');
		return this.deleteOldResults();
	}
}
