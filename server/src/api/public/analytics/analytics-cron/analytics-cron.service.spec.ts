import { SiteStatus, StatPeriod } from '@generated/turso/enums';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsCronService } from './analytics-cron.service';

type PrismaMock = {
	monitorLog: {
		groupBy: jest.Mock;
		deleteMany: jest.Mock;
	};
	monitorStats: {
		createMany: jest.Mock;
		deleteMany: jest.Mock;
	};
};

describe('AnalyticsCronService', () => {
	let service: AnalyticsCronService;
	let prisma: PrismaMock;

	const mockDate = new Date('2026-04-08T12:00:00.000Z');

	beforeEach(async () => {
		jest.useFakeTimers();
		jest.setSystemTime(mockDate.getTime());

		prisma = {
			monitorLog: {
				groupBy: jest.fn(),
				deleteMany: jest.fn(),
			},
			monitorStats: {
				createMany: jest.fn(),
				deleteMany: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AnalyticsCronService,
				{ provide: TursoPrismaService, useValue: prisma },
			],
		}).compile();

		service = module.get<AnalyticsCronService>(AnalyticsCronService);
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('aggregateHourly', () => {
		it('should calculate correct start and end times and call runAggregation', async () => {
			const runAggregationSpy = jest
				.spyOn(service, 'runAggregation')
				.mockResolvedValue();

			await service.aggregateHourly();

			const expectedEnd = new Date('2026-04-08T12:00:00.000Z');
			const expectedStart = new Date('2026-04-08T11:00:00.000Z');

			expect(runAggregationSpy).toHaveBeenCalledWith(
				expectedStart,
				expectedEnd,
				StatPeriod.HOURLY,
			);
		});
	});

	describe('aggregateDaily', () => {
		it('should calculate correct start and end times and call runAggregation', async () => {
			const runAggregationSpy = jest
				.spyOn(service, 'runAggregation')
				.mockResolvedValue();

			const currentDayMock = new Date('2026-04-08T15:30:00.000Z');

			jest.setSystemTime(currentDayMock.getTime());

			await service.aggregateDaily();

			const expectedEnd = new Date('2026-04-08T00:00:00.000Z');
			const expectedStart = new Date('2026-04-07T00:00:00.000Z');

			expect(runAggregationSpy).toHaveBeenCalledWith(
				expectedStart,
				expectedEnd,
				StatPeriod.DAILY,
			);
		});
	});

	describe('runAggregation', () => {
		const start = new Date('2026-04-08T11:00:00.000Z');
		const end = new Date('2026-04-08T12:00:00.000Z');
		const period = StatPeriod.HOURLY;

		it('should return early if totalStats is empty', async () => {
			prisma.monitorLog.groupBy.mockResolvedValueOnce([]);

			await service.runAggregation(start, end, period);

			expect(prisma.monitorLog.groupBy).toHaveBeenCalledTimes(1);
			expect(prisma.monitorStats.createMany).not.toHaveBeenCalled();
		});

		it('should calculate percentages correctly and insert stats', async () => {
			const totalStatsMock = [
				{
					monitorId: 'monitor_1',
					regionId: 'region_1',
					_avg: { responseTimeMs: 150.5 },
					_count: { status: 10 },
				},
				{
					monitorId: 'monitor_2',
					regionId: 'region_2',
					_avg: { responseTimeMs: null },
					_count: { status: 5 },
				},
			];

			const upStatsMock = [
				{
					monitorId: 'monitor_1',
					regionId: 'region_1',
					_count: { status: 9 },
				},
			];

			prisma.monitorLog.groupBy
				.mockResolvedValueOnce(totalStatsMock)
				.mockResolvedValueOnce(upStatsMock);

			await service.runAggregation(start, end, period);

			expect(prisma.monitorLog.groupBy).toHaveBeenCalledTimes(2);
			expect(prisma.monitorStats.createMany).toHaveBeenCalledWith({
				data: [
					{
						monitorId: 'monitor_1',
						regionId: 'region_1',
						avgResponseMs: 151,
						uptimePercent: 90,
						timestamp: start,
						period: period,
					},
					{
						monitorId: 'monitor_2',
						regionId: 'region_2',
						avgResponseMs: 0,
						uptimePercent: 0,
						timestamp: start,
						period: period,
					},
				],
				skipDuplicates: true,
			});
		});
	});

	describe('cleanupLogsAndStats', () => {
		it('should execute deleteMany queries with correct date thresholds', async () => {
			await service.cleanupLogsAndStats();

			const oneDayAgo = new Date('2026-04-07T12:00:00.000Z');
			const sevenDaysAgo = new Date('2026-04-01T12:00:00.000Z');
			const thirtyDaysAgo = new Date('2026-03-09T12:00:00.000Z');
			const ninetyDaysAgo = new Date('2026-01-08T12:00:00.000Z');

			expect(prisma.monitorLog.deleteMany).toHaveBeenNthCalledWith(1, {
				where: {
					createdAt: { lt: oneDayAgo },
					status: SiteStatus.UP,
				},
			});

			expect(prisma.monitorLog.deleteMany).toHaveBeenNthCalledWith(2, {
				where: {
					createdAt: { lt: thirtyDaysAgo },
				},
			});

			expect(prisma.monitorStats.deleteMany).toHaveBeenNthCalledWith(1, {
				where: {
					period: StatPeriod.HOURLY,
					timestamp: { lt: sevenDaysAgo },
				},
			});

			expect(prisma.monitorStats.deleteMany).toHaveBeenNthCalledWith(2, {
				where: {
					period: StatPeriod.DAILY,
					timestamp: { lt: ninetyDaysAgo },
				},
			});
		});
	});
});
