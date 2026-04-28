import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../../auth.module';
import { GithubController } from './github.controller';

@Module({
	controllers: [GithubController],
	imports: [forwardRef(() => AuthModule)],
})
export class GithubModule {}
