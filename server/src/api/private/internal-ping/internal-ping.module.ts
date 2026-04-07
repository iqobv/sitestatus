import { Module } from '@nestjs/common';
import { InternalPingController } from './internal-ping.controller';
import { InternalPingService } from './internal-ping.service';

@Module({
	controllers: [InternalPingController],
	providers: [InternalPingService],
})
export class InternalPingModule {}
