import { Test, TestingModule } from '@nestjs/testing';
import { PingResult } from 'generated/prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreatePingResultDto } from './dto';
import { PingResultService } from './ping-result.service';

type PrismaMock = {
	pingResult: {
		create: jest.Mock;
		findMany: jest.Mock;
		deleteMany: jest.Mock;
	};
};

describe('PingResultService', () => {
	let service: PingResultService;
	let prisma: PrismaMock;

	const pingResult: PingResult = {
		id: 'pingResultId',
		monitorId: 'monitorId',
		checkedAt: new Date(),
		status: 'UP',
		statusCode: 200,
		responseTimeMs: 150,
		errorMessage: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const MOCK_TIME = new Date('2025-11-16T22:00:00.000Z');
	const MOCK_TIME_MINUS_90_DAYS = new Date(
		MOCK_TIME.getTime() - 90 * 24 * 60 * 60 * 1000,
	);

	beforeEach(async () => {
		prisma = {
			pingResult: {
				create: jest.fn(),
				findMany: jest.fn(),
				deleteMany: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PingResultService,
				{
					provide: PrismaService,
					useValue: prisma,
				},
			],
		}).compile();

		service = module.get<PingResultService>(PingResultService);
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
		it('should create a new ping result', async () => {
			prisma.pingResult.create.mockResolvedValue(pingResult);

			const dto: CreatePingResultDto = {
				monitorId: 'monitorId',
				status: 'UP',
				statusCode: 200,
				responseTimeMs: 150,
				errorMessage: null,
			};

			const result = await service.create(dto);

			expect(prisma.pingResult.create).toHaveBeenCalledWith({
				data: {
					monitor: { connect: { id: dto.monitorId } },
					status: dto.status,
					statusCode: dto.statusCode,
					responseTimeMs: dto.responseTimeMs,
					errorMessage: dto.errorMessage,
				},
			});
			expect(result).toEqual(pingResult);
		});
	});

	describe('deleteOldResults', () => {
		it('should delete ping results older than 90 days', async () => {
			prisma.pingResult.deleteMany.mockResolvedValue({ count: 5 });

			const result = await service.deleteOldResults();

			expect(prisma.pingResult.deleteMany).toHaveBeenCalledWith({
				where: { checkedAt: { lt: MOCK_TIME_MINUS_90_DAYS } },
			});
			expect(result).toBe(true);
		});
	});
});
