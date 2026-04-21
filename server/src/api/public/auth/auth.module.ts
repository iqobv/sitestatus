import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '../token/token.module';
import { UserProviderModule } from '../user-provider/user-provider.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OauthModule } from './oauth/oauth.module';
import { AccessTokenStrategy, GoogleStrategy } from './strategies';

@Module({
	imports: [
		JwtModule.register({}),
		UserModule,
		UserProviderModule,
		TokenModule,
		OauthModule,
		SessionModule,
	],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, GoogleStrategy],
	exports: [AuthService],
})
export class AuthModule {}
