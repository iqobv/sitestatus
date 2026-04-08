import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Region } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { SUCCESS_MESSAGES } from 'src/libs/constants';
import { AdminRegionService } from './admin-region.service';
import { CreateRegionDto, UpdateRegionDto } from './dto';

type PrismaMock = {
	region: {
		create: jest.Mock;
		findUnique: jest.Mock;
		update: jest.Mock;
		delete: jest.Mock;
	};
};

describe('AdminRegionService', () => {
	let service: AdminRegionService;
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

	const prismaError = new Prisma.PrismaClientKnownRequestError(
		'Unique constraint failed on the fields: (`key`)',
		{
			code: 'P2002',
			clientVersion: '5.0.0',
		},
	);

	const { id, key } = regionMock;

	beforeEach(async () => {
		prisma = {
			region: {
				create: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AdminRegionService,
				{ provide: PrismaService, useValue: prisma },
			],
		}).compile();

		service = module.get<AdminRegionService>(AdminRegionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createRegion', () => {
		const dto: CreateRegionDto = {
			key: 'eu_west',
			name: 'EU West',
			continent: 'Europe',
			isActive: true,
			latitude: 51.5074,
			longitude: -0.1278,
		};

		it('should create region', async () => {
			prisma.region.create.mockResolvedValue(regionMock);

			const result = await service.createRegion(dto);

			expect(prisma.region.create).toHaveBeenCalledWith({
				data: dto,
			});
			expect(result).toEqual(regionMock);
		});

		it('should throw an error if region with same key already exists', async () => {
			prisma.region.create.mockRejectedValue(prismaError);

			await expect(service.createRegion({ ...dto, key: key })).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe('getRegionByKey', () => {
		it('should return the region with the specified key', async () => {
			prisma.region.findUnique.mockResolvedValue(regionMock);

			const result = await service.getRegionByKey(key);

			expect(prisma.region.findUnique).toHaveBeenCalledWith({
				where: { key },
			});
			expect(result).toEqual(regionMock);
		});

		it('should throw an error if region with specified key does not exist', async () => {
			prisma.region.findUnique.mockResolvedValue(null);

			await expect(service.getRegionByKey('non_existent_key')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('getRegionById', () => {
		it('should return the region with the specified id', async () => {
			prisma.region.findUnique.mockResolvedValue(regionMock);

			const result = await service.getRegionById(id);

			expect(prisma.region.findUnique).toHaveBeenCalledWith({
				where: { id },
			});
			expect(result).toEqual(regionMock);
		});

		it('should throw an error if region with specified id does not exist', async () => {
			prisma.region.findUnique.mockResolvedValue(null);

			await expect(service.getRegionById('non_existent_id')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('updateRegion', () => {
		it('should update region', async () => {
			prisma.region.findUnique.mockResolvedValue(regionMock);
			prisma.region.update.mockResolvedValue(regionMock);

			const result = await service.updateRegion(id, { name: 'Updated Region' });

			expect(prisma.region.findUnique).toHaveBeenCalledWith({
				where: { id },
			});
			expect(prisma.region.update).toHaveBeenCalledWith({
				where: { id },
				data: { name: 'Updated Region' },
			});
			expect(result).toEqual(regionMock);
		});

		it('should throw an error if region with specified id does not exist', async () => {
			prisma.region.findUnique.mockResolvedValue(null);

			await expect(
				service.updateRegion('non_existent_id', { name: 'Updated Region' }),
			).rejects.toThrow(NotFoundException);
		});

		it('should throw ConflictException if region with same key already exists', async () => {
			prisma.region.findUnique.mockResolvedValue(regionMock);
			prisma.region.update.mockRejectedValueOnce(prismaError);

			const dto: UpdateRegionDto = {
				key: 'existing_key',
			};

			await expect(service.updateRegion(id, dto)).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe('deleteRegion', () => {
		it('should delete region', async () => {
			prisma.region.findUnique.mockResolvedValue(regionMock);
			prisma.region.delete.mockResolvedValue(regionMock);

			const result = await service.deleteRegion(id);

			expect(prisma.region.findUnique).toHaveBeenCalledWith({
				where: { id },
			});
			expect(prisma.region.delete).toHaveBeenCalledWith({
				where: { id },
			});
			expect(result).toEqual(SUCCESS_MESSAGES.REGION.REGION_DELETED);
		});

		it('should throw NotFoundException if region with specified id does not exist', async () => {
			prisma.region.findUnique.mockResolvedValue(null);

			await expect(service.deleteRegion('non_existent_id')).rejects.toThrow(
				NotFoundException,
			);
		});
	});
});
