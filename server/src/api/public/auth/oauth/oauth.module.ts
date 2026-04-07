import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { UserModule } from '../../user/user.module';
import { UserProviderModule } from '../../user-provider/user-provider.module';

@Module({
	controllers: [OauthController],
	imports: [forwardRef(() => AuthModule), UserModule, UserProviderModule],
	providers: [OauthService],
})
export class OauthModule {}
