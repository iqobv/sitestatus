import { ServiceBusMessage } from '@azure/service-bus';
import { SiteStatus } from '@generated/turso/enums';
import { IsEnum, IsString } from 'class-validator';

export class IncedentPayloadDto {
	@IsEnum(SiteStatus)
	type: SiteStatus;

	@IsString()
	incidentId: string;

	@IsString()
	monitorId: string;

	@IsString()
	regionId: string;
}

export interface ServiceBusIncedentPayload extends ServiceBusMessage {
	body: IncedentPayloadDto;
}
