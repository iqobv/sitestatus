import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';
import { MailModule } from './mail/mail.module';

@Module({
	imports: [PrismaModule, QueueModule, MailModule],
})
export class InfraModule {}
