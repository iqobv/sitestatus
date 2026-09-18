import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceBusModule } from './service-bus/service-bus.module';
import { EnvModule } from './env/env.module';

@Module({
	imports: [PrismaModule, MailModule, ServiceBusModule, EnvModule],
})
export class InfraModule {}
