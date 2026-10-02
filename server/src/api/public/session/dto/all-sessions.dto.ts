import { Expose, Type } from 'class-transformer';
import { SessionDto } from './session.dto';

export class AllSessionsDto {
	@Expose()
	@Type(() => SessionDto)
	currentSession: SessionDto;

	@Expose()
	@Type(() => SessionDto)
	otherSessions: SessionDto[];
}
