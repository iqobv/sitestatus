import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TokenModule } from '../token/token.module';
import { UserProviderModule } from '../user-provider/user-provider.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OauthModule } from './oauth/oauth.module';
import { OauthService } from './oauth/oauth.service';
import { SessionSerializer } from './passport.serializer';
import { GoogleStrategy, LocalStrategy } from './strategies';

@Module({
	imports: [
		UserModule,
		UserProviderModule,
		TokenModule,
		PassportModule.register({ session: true }),
		OauthModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		SessionSerializer,
		LocalStrategy,
		GoogleStrategy,
		OauthService,
	],
	exports: [AuthService],
})
export class AuthModule {}
