import { StatPeriod } from '@generated/turso/enums';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';

type TursoPrismaMock = {
	monitorLog: {
		findMany: jest.Mock;
	};
	monitorStats: {
		findMany: jest.Mock;
	};
};

type PgPrismaMock = {
	monitor: {
		findFirst: jest.Mock;
	};
};

describe('AnalyticsService', () => {
	let service: AnalyticsService;
	let tursoPrisma: TursoPrismaMock;
	let pgPrisma: PgPrismaMock;

	const mockDate = new Date('2026-04-08T12:00:00.000Z');
	const mockUserId = 'user-1';

	beforeEach(async () => {
		jest.useFakeTimers();
		jest.setSystemTime(mockDate.getTime());

		tursoPrisma = {
			monitorLog: {
				findMany: jest.fn(),
			},
			monitorStats: {
				findMany: jest.fn(),
			},
		};

		pgPrisma = {
			monitor: {
				findFirst: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AnalyticsService,
				{ provide: PgPrismaService, useValue: pgPrisma },
				{ provide: TursoPrismaService, useValue: tursoPrisma },
			],
		}).compile();

		service = module.get<AnalyticsService>(AnalyticsService);
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getAnalyticsByMonitorId', () => {
		const monitorId = 'monitor_1';

		it('should return RAW logs when daysRange is 1', async () => {
			pgPrisma.monitor.findFirst.mockResolvedValue({
				id: monitorId,
				userId: mockUserId,
			});

			const expectedStartDate = new Date('2026-04-07T12:00:00.000Z');
			const rawLogsMock = [
				{
					status: 'UP',
					responseTimeMs: 120,
					errorMessage: null,
					createdAt: expectedStartDate,
					regionId: 'region_1',
				},
			];

			tursoPrisma.monitorLog.findMany.mockResolvedValue(rawLogsMock);

			const result = await service.getAnalyticsByMonitorId(
				mockUserId,
				monitorId,
				{
					region: 'global',
					daysRange: 1,
				},
			);

			expect(tursoPrisma.monitorLog.findMany).toHaveBeenCalledWith({
				where: { monitorId, createdAt: { gte: expectedStartDate } },
				select: {
					status: true,
					responseTimeMs: true,
					errorMessage: true,
					createdAt: true,
					regionId: true,
				},
			});

			expect(result).toEqual({
				period: 'RAW',
				data: rawLogsMock,
			});
			expect(tursoPrisma.monitorStats.findMany).not.toHaveBeenCalled();
		});

		it('should return HOURLY stats when daysRange is 7', async () => {
			const expectedStartDate = new Date('2026-04-01T12:00:00.000Z');
			const statsMock = [
				{
					uptimePercent: 99.9,
					avgResponseMs: 150,
					timestamp: expectedStartDate,
					regionId: 'region_1',
					status: 'UP',
				},
			];

			tursoPrisma.monitorStats.findMany.mockResolvedValue(statsMock);

			const result = await service.getAnalyticsByMonitorId(
				mockUserId,
				monitorId,
				{
					region: 'global',
					daysRange: 7,
				},
			);

			expect(tursoPrisma.monitorStats.findMany).toHaveBeenCalledWith({
				where: {
					monitorId,
					period: StatPeriod.HOURLY,
					timestamp: { gte: expectedStartDate },
				},
				orderBy: { timestamp: 'asc' },
				select: {
					uptimePercent: true,
					avgResponseMs: true,
					timestamp: true,
					regionId: true,
					status: true,
				},
			});

			expect(result).toEqual({
				period: StatPeriod.HOURLY,
				data: statsMock,
			});
			expect(tursoPrisma.monitorLog.findMany).not.toHaveBeenCalled();
		});

		it('should return DAILY stats when daysRange is 30', async () => {
			pgPrisma.monitor.findFirst.mockResolvedValue({
				id: monitorId,
				userId: mockUserId,
			});

			const expectedStartDate = new Date('2026-03-09T12:00:00.000Z');
			const statsMock = [
				{
					uptimePercent: 100,
					avgResponseMs: 145,
					timestamp: expectedStartDate,
					regionId: 'region_1',
					status: 'UP',
				},
			];

			tursoPrisma.monitorStats.findMany.mockResolvedValue(statsMock);

			const result = await service.getAnalyticsByMonitorId(
				mockUserId,
				monitorId,
				{
					region: 'global',
					daysRange: 30,
				},
			);

			expect(tursoPrisma.monitorStats.findMany).toHaveBeenCalledWith({
				where: {
					monitorId,
					period: StatPeriod.DAILY,
					timestamp: { gte: expectedStartDate },
				},
				orderBy: { timestamp: 'asc' },
				select: {
					uptimePercent: true,
					avgResponseMs: true,
					timestamp: true,
					regionId: true,
					status: true,
				},
			});

			expect(result).toEqual({
				period: StatPeriod.DAILY,
				data: statsMock,
			});
			expect(tursoPrisma.monitorLog.findMany).not.toHaveBeenCalled();
		});
	});
});
