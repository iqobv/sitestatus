import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';
import { MailModule } from './mail/mail.module';
import { RedisModule } from './redis/redis.module';
import { ServiceBusModule } from './service-bus/service-bus.module';

@Module({
	imports: [PrismaModule, QueueModule, MailModule, RedisModule, ServiceBusModule],
})
export class InfraModule {}
