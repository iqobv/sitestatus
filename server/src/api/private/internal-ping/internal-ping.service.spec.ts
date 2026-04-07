import { Test, TestingModule } from '@nestjs/testing';
import { InternalPingService } from './internal-ping.service';

describe('InternalPingService', () => {
	let service: InternalPingService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InternalPingService],
		}).compile();

		service = module.get<InternalPingService>(InternalPingService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
