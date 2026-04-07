import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AdminRegionService } from '../admin-region/admin-region.service';
import { PingResultDto } from './dto';

@Injectable()
export class InternalPingService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly regionService: AdminRegionService,
	) {}

	async getTasks(regionKey: string) {
		const region = await this.regionService.getRegionByKey(regionKey, true);

		return await this.prismaService.monitorRegion.findMany({
			where: { regionId: region!.id, isActive: true },
		});
	}

	async saveResults(results: PingResultDto[]) {
		if (results.length === 0) return;

		results.forEach((result) => {
			console.log(
				`Region ${result.region} reported: ${result.monitorId} is ${result.status}`,
			);
		});
	}
}
