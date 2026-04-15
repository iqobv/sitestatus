import { StatPeriod } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AnalyticsService } from './analytics.service';

type PrismaMock = {
	monitorLog: {
		findMany: jest.Mock;
	};
	monitorStats: {
		findMany: jest.Mock;
	};
};

describe('AnalyticsService', () => {
	let service: AnalyticsService;
	let prisma: PrismaMock;

	const mockDate = new Date('2026-04-08T12:00:00.000Z');

	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(mockDate.getTime());

		prisma = {
			monitorLog: {
				findMany: jest.fn(),
			},
			monitorStats: {
				findMany: jest.fn(),
			},
		};

		service = new AnalyticsService(prisma as unknown as PrismaService);
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

			prisma.monitorLog.findMany.mockResolvedValue(rawLogsMock);

			const result = await service.getAnalyticsByMonitorId(monitorId, 1);

			expect(prisma.monitorLog.findMany).toHaveBeenCalledWith({
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
			expect(prisma.monitorStats.findMany).not.toHaveBeenCalled();
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

			prisma.monitorStats.findMany.mockResolvedValue(statsMock);

			const result = await service.getAnalyticsByMonitorId(monitorId, 7);

			expect(prisma.monitorStats.findMany).toHaveBeenCalledWith({
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
			expect(prisma.monitorLog.findMany).not.toHaveBeenCalled();
		});

		it('should return DAILY stats when daysRange is 30', async () => {
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

			prisma.monitorStats.findMany.mockResolvedValue(statsMock);

			const result = await service.getAnalyticsByMonitorId(monitorId, 30);

			expect(prisma.monitorStats.findMany).toHaveBeenCalledWith({
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
			expect(prisma.monitorLog.findMany).not.toHaveBeenCalled();
		});
	});
});
