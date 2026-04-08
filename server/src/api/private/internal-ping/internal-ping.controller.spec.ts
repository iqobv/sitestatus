import { Test, TestingModule } from '@nestjs/testing';
import { InternalPingController } from './internal-ping.controller';
import { InternalPingService } from './internal-ping.service';

describe('InternalPingController', () => {
	let controller: InternalPingController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [InternalPingController],
			providers: [InternalPingService],
		}).compile();

		controller = module.get<InternalPingController>(InternalPingController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
