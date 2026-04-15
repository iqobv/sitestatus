import { Test, TestingModule } from '@nestjs/testing';
import { Region } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { RegionService } from './region.service';

type PrismaMock = {
	region: {
		findMany: jest.Mock;
	};
};

describe('RegionService', () => {
	let service: RegionService;
	let prisma: PrismaMock;

	const regionMock: Region = {
		id: 'region_1',
		key: 'us_east',
		name: 'US East',
		continent: 'North America',
		isActive: true,
		latitude: 40.7128,
		longitude: -74.006,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		prisma = {
			region: { findMany: jest.fn() },
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [RegionService, { provide: PrismaService, useValue: prisma }],
		}).compile();

		service = module.get<RegionService>(RegionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getAllActiveRegions', () => {
		it('should return all active regions', async () => {
			prisma.region.findMany.mockResolvedValue([regionMock]);

			const result = await service.getAllActiveRegions();

			expect(result).toEqual([regionMock]);
		});
	});
});
