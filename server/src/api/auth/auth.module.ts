import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StringValue } from 'ms';
import { TokenModule } from '../token/token.module';
import { UserProviderModule } from '../user-provider/user-provider.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OauthModule } from './oauth/oauth.module';
import { OauthService } from './oauth/oauth.service';
import { GoogleStrategy, JwtStrategy } from './strategies';

@Module({
	imports: [
		UserModule,
		UserProviderModule,
		TokenModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.getOrThrow<StringValue>('JWT_ACCESS_TTL'),
				},
			}),
			inject: [ConfigService],
		}),
		OauthModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GoogleStrategy, OauthService],
	exports: [AuthService],
})
export class AuthModule {}
