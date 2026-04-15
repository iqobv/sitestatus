import { Module } from '@nestjs/common';
import { UserProviderService } from './user-provider.service';

@Module({
	exports: [UserProviderService],
	providers: [UserProviderService],
})
export class UserProviderModule {}
