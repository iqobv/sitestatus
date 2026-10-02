import { OmitType } from '@nestjs/swagger';
import { StatusPageEntityDto } from './status-page.entity.dto';

export class StatusPageDto extends OmitType(StatusPageEntityDto, [
	'monitors',
] as const) {}

export class FullStatusPageDto extends StatusPageEntityDto {}
