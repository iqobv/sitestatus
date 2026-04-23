import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegionService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async getAllActiveRegions() {
		return await this.prismaService.region.findMany({
			where: { isActive: true },
		});
	}

	async isRegionsActive(regionIds: string[]) {
		const regions = await this.prismaService.region.findMany({
			where: {
				id: { in: regionIds },
				isActive: true,
			},
		});

		return regions.length === regionIds.length;
	}
}
