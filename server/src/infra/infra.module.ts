import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceBusModule } from './service-bus/service-bus.module';

@Module({
	imports: [PrismaModule, MailModule, ServiceBusModule],
})
export class InfraModule {}
