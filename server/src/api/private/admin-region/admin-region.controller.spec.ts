import { Region } from '@generated/postgres/client';
import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminRegionController } from './admin-region.controller';
import { AdminRegionService } from './admin-region.service';
import { CreateRegionDto, UpdateRegionDto } from './dto';

type ServiceMock = {
	createRegion: jest.Mock;
	getRegionByKey: jest.Mock;
	getRegionById: jest.Mock;
	updateRegion: jest.Mock;
	deleteRegion: jest.Mock;
};

describe('AdminRegionController', () => {
	let controller: AdminRegionController;
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

	const { id, key } = regionMock;

	beforeEach(async () => {
		service = {
			createRegion: jest.fn(),
			getRegionByKey: jest.fn(),
			getRegionById: jest.fn(),
			updateRegion: jest.fn(),
			deleteRegion: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AdminRegionController],
			providers: [
				{ provide: AdminRegionService, useValue: service },
				{ provide: ConfigService, useValue: service },
			],
		}).compile();

		controller = module.get<AdminRegionController>(AdminRegionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('createRegion', () => {
		const createRegionDto: CreateRegionDto = {
			key: 'us_east',
			name: 'US East',
			continent: 'North America',
			isActive: true,
			latitude: 40.7128,
			longitude: -74.006,
		};

		it('should create a new region', async () => {
			service.createRegion.mockResolvedValue(regionMock);

			const result = await controller.createRegion(createRegionDto);

			expect(result).toEqual(regionMock);
		});

		it('should throw an error if region creation fails', async () => {
			service.createRegion.mockRejectedValue(new ConflictException());

			await expect(controller.createRegion(createRegionDto)).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe('getRegionByKey', () => {
		it('should return a region by key', async () => {
			service.getRegionByKey.mockResolvedValue(regionMock);

			const result = await controller.getRegionByKey(key);

			expect(result).toEqual(regionMock);
		});
	});

	describe('getRegionById', () => {
		it('should return a region by ID', async () => {
			service.getRegionById.mockResolvedValue(regionMock);

			const result = await controller.getRegionById(id);

			expect(result).toEqual(regionMock);
		});
	});

	describe('updateRegion', () => {
		const updateRegionDto: UpdateRegionDto = {
			name: 'US East Updated',
			key: 'us_east_updated',
		};

		it('should update a region', async () => {
			service.updateRegion.mockResolvedValue(regionMock);

			const result = await controller.updateRegion(id, updateRegionDto);

			expect(result).toEqual(regionMock);
		});

		it('should throw an error if region update fails', async () => {
			service.updateRegion.mockRejectedValue(new ConflictException());

			await expect(
				controller.updateRegion(id, updateRegionDto),
			).rejects.toThrow(ConflictException);
		});
	});

	describe('deleteRegion', () => {
		it('should delete a region', async () => {
			service.deleteRegion.mockResolvedValue(undefined);

			await controller.deleteRegion(id);

			expect(service.deleteRegion).toHaveBeenCalledWith(id);
		});
	});
});
