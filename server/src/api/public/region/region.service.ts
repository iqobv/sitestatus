import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { Injectable } from '@nestjs/common';
import { RegionDto } from './dto/region.dto';

@Injectable()
export class RegionService {
	constructor(private readonly prismaService: PgPrismaService) {}

	public async getAllActiveRegions(): Promise<RegionDto[]> {
		return await this.prismaService.region.findMany({
			where: { isActive: true },
		});
	}

	public async isRegionsActive(regionIds: string[]): Promise<boolean> {
		const regions = await this.prismaService.region.findMany({
			where: {
				id: { in: regionIds },
				isActive: true,
			},
		});

		return regions.length === regionIds.length;
	}
}
