import { ApiProperty } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class AllSessionsDto {
	@ApiProperty({ type: SessionDto })
	currentSession: SessionDto;

	@ApiProperty({ type: [SessionDto] })
	otherSessions: SessionDto[];
}
