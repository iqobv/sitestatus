import { forwardRef, Module } from '@nestjs/common';
import { UserProviderModule } from 'src/api/user-provider/user-provider.module';
import { UserModule } from 'src/api/user/user.module';
import { AuthModule } from '../auth.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
	controllers: [OauthController],
	imports: [forwardRef(() => AuthModule), UserModule, UserProviderModule],
	providers: [OauthService],
})
export class OauthModule {}
