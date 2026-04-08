import { Test, TestingModule } from '@nestjs/testing';
import { Region } from 'generated/prisma/client';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

type ServiceMock = {
	getAllActiveRegions: jest.Mock;
};

describe('RegionController', () => {
	let controller: RegionController;
	let service: ServiceMock;

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
		service = {
			getAllActiveRegions: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [RegionController],
			providers: [{ provide: RegionService, useValue: service }],
		}).compile();

		controller = module.get<RegionController>(RegionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getAllActiveRegions', () => {
		it('should return all active regions', async () => {
			service.getAllActiveRegions.mockResolvedValue([regionMock]);

			const result = await controller.getAllActiveRegions();

			expect(result).toEqual([regionMock]);
		});
	});
});
