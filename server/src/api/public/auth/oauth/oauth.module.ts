import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { GithubModule } from './github/github.module';

@Module({
	imports: [GoogleModule, GithubModule],
})
export class OauthModule {}
