import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class RegionService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllActiveRegions() {
		return await this.prismaService.region.findMany({
			where: { isActive: true },
		});
	}
}
