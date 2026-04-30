import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
	controllers: [SessionController],
	providers: [SessionService],
	imports: [HttpModule],
	exports: [SessionService],
})
export class SessionModule {}
