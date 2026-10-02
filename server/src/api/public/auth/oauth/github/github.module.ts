import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../../auth.module';
import { CookieModule } from '../../cookie/cookie.module';
import { GithubController } from './github.controller';

@Module({
	controllers: [GithubController],
	imports: [forwardRef(() => AuthModule), CookieModule],
})
export class GithubModule {}
