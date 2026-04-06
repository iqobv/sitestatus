import { Test, TestingModule } from '@nestjs/testing';
import { Monitor } from 'generated/prisma/client';
import { SiteStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { MonitorService } from './monitor.service';

type PrismaMock = {
	monitor: {
		create: jest.Mock;
		findMany: jest.Mock;
		findUnique: jest.Mock;
		update: jest.Mock;
		delete: jest.Mock;
	};
};

describe('MonitorService', () => {
	let service: MonitorService;
	let prisma: PrismaMock;

	const monitor: Monitor = {
		id: 'monitorId',
		name: 'Test Monitor',
		url: 'https://example.com',
		projectId: null,
		checkIntervalSeconds: 60,
		lastCheckedAt: new Date(),
		lastStatus: SiteStatus.UP,
		isActive: true,
		userId: 'userId',
		nextCheckAt: new Date(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const monitorWithPingResults = {
		...monitor,
		pingResults: [
			{
				id: 'pingResultId',
				monitorId: 'monitorId',
				checkedAt: new Date(),
				status: SiteStatus.UP,
				responseTimeMs: 120,
			},
		],
	};

	const MOCK_TIME = new Date('2025-11-16T22:00:00.000Z');
	const MOCK_TIME_MINUS_30_DAYS = new Date(
		MOCK_TIME.getTime() - 30 * 24 * 60 * 60 * 1000,
	);
	const MOCK_TIME_MINUS_7_DAYS = new Date(
		MOCK_TIME.getTime() - 7 * 24 * 60 * 60 * 1000,
	);

	beforeEach(async () => {
		prisma = {
			monitor: {
				create: jest.fn(),
				findMany: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MonitorService,
				{
					provide: PrismaService,
					useValue: prisma,
				},
			],
		}).compile();

		service = module.get<MonitorService>(MonitorService);
		jest.useFakeTimers();
		jest.setSystemTime(MOCK_TIME);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a monitor', async () => {
			prisma.monitor.create.mockResolvedValue(monitor);

			const dto = {
				name: 'Test Monitor',
				url: 'https://example.com',
				checkIntervalSeconds: 300,
				isActive: true,
			};

			const result = await service.create('userId', dto);

			expect(prisma.monitor.create).toHaveBeenCalledWith({
				data: {
					name: dto.name,
					url: dto.url,
					checkIntervalSeconds: dto.checkIntervalSeconds,
					isActive: dto.isActive,
					lastCheckedAt: undefined,
					lastStatus: undefined,
					user: {
						connect: {
							id: 'userId',
						},
					},
				},
			});
			expect(result).toEqual(monitor);
		});
	});

	describe('findById', () => {
		it('should find a monitor by id', async () => {
			prisma.monitor.findUnique.mockResolvedValue(monitorWithPingResults);

			const result = await service.findById('userId', 'monitorId');

			expect(prisma.monitor.findUnique).toHaveBeenCalledWith({
				where: { id: 'monitorId', userId: 'userId' },
				include: {
					pingResults: {
						where: {
							checkedAt: {
								gt: MOCK_TIME_MINUS_30_DAYS,
							},
						},
					},
				},
			});
			expect(result).toEqual(monitorWithPingResults);
		});

		it('should throw NotFoundException if monitor not found with non exists monitorId', async () => {
			prisma.monitor.findUnique.mockResolvedValue(null);

			await expect(
				service.findById('userId', 'nonExistentMonitorId'),
			).rejects.toThrow('Monitor not found');
		});

		it('should throw NotFoundException if monitor not found with non exists userId', async () => {
			prisma.monitor.findUnique.mockResolvedValue(null);

			await expect(
				service.findById('nonExistentUserId', 'monitorId'),
			).rejects.toThrow('Monitor not found');
		});
	});

	describe('findAll', () => {
		it('should find all monitors for a user', async () => {
			prisma.monitor.findMany.mockResolvedValue([monitorWithPingResults]);

			const result = await service.findAll('userId');

			expect(prisma.monitor.findMany).toHaveBeenCalledWith({
				where: { userId: 'userId' },
				include: {
					pingResults: {
						where: {
							checkedAt: {
								gt: MOCK_TIME_MINUS_7_DAYS,
							},
						},
					},
				},
			});
			expect(result).toEqual([monitorWithPingResults]);
		});
	});

	describe('update', () => {
		const dto = {
			name: 'Updated Monitor',
			url: 'https://updated-example.com',
			checkIntervalSeconds: 600,
			isActive: false,
		};

		it('should update a monitor', async () => {
			prisma.monitor.findUnique.mockResolvedValue(monitor);
			prisma.monitor.update.mockResolvedValue(monitor);

			const result = await service.update('monitorId', 'userId', dto);

			expect(prisma.monitor.update).toHaveBeenCalledWith({
				where: { id: 'monitorId', userId: 'userId' },
				data: {
					name: dto.name,
					url: dto.url,
					checkIntervalSeconds: dto.checkIntervalSeconds,
					isActive: dto.isActive,
					lastCheckedAt: undefined,
					lastStatus: undefined,
				},
			});
			expect(result).toEqual(monitor);
		});

		it('should throw NotFoundException if monitor to update not found', async () => {
			prisma.monitor.update.mockRejectedValue(new Error('Monitor not found'));

			await expect(
				service.update('nonExistentMonitorId', 'userId', dto),
			).rejects.toThrow('Monitor not found');
		});
	});

	describe('delete', () => {
		it('should delete a monitor', async () => {
			prisma.monitor.findUnique.mockResolvedValue(monitor);
			prisma.monitor.delete.mockResolvedValue(monitor);

			const result = await service.remove('monitorId', 'userId');

			expect(prisma.monitor.delete).toHaveBeenCalledWith({
				where: { id: 'monitorId', userId: 'userId' },
			});
			expect(result).toBe(true);
		});

		it('should throw NotFoundException if monitor to delete not found', async () => {
			prisma.monitor.delete.mockRejectedValue(new Error('Monitor not found'));

			await expect(
				service.remove('nonExistentMonitorId', 'userId'),
			).rejects.toThrow('Monitor not found');
		});
	});
});
