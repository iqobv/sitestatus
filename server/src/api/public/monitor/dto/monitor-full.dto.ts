import { ApiProperty } from '@nestjs/swagger';
import { MonitorDto } from './monitor.dto';

export class MonitorFullDto extends MonitorDto {
	@ApiProperty({ example: ['string'] })
	pingResults: string[];
}
