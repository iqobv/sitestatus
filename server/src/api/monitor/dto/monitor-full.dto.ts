import { ApiProperty } from '@nestjs/swagger';
import { PingResultDto } from 'src/api/ping-result/dto';
import { MonitorDto } from './monitor.dto';

export class MonitorFullDto extends MonitorDto {
	@ApiProperty({ type: [PingResultDto] })
	pingResults: PingResultDto[];
}
