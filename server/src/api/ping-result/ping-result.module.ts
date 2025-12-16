import { Module } from '@nestjs/common';
import { PingResultService } from './ping-result.service';

@Module({
	providers: [PingResultService],
	exports: [PingResultService],
})
export class PingResultModule {}
