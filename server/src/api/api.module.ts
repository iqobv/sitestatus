import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		UserProviderModule,
		AuthModule,
		TokenModule,
	],
})
export class ApiModule {}
