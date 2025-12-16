import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';
import { MailModule } from './mail/mail.module';
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [PrismaModule, QueueModule, MailModule, RedisModule],
})
export class InfraModule {}
