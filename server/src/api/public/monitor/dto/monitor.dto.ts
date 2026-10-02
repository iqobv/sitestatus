import { IntersectionType, PickType } from '@nestjs/swagger';
import { MonitorEntityDto } from './monitor.entity.dto';

export class BaseMonitorDto extends PickType(MonitorEntityDto, [
	'name',
	'url',
	'checkIntervalSeconds',
	'method',
	'isActive',
	'projectId',
	'userId',
	'id',
	'createdAt',
	'updatedAt',
	'deletedAt',
] as const) {}

export class MonitorDto extends IntersectionType(
	BaseMonitorDto,
	PickType(MonitorEntityDto, [
		'nextCheckAt',
		'lastCheckedAt',
		'lastStatus',
		'uptime',
	] as const),
) {}

export class MonitorFullDto extends IntersectionType(
	MonitorDto,
	PickType(MonitorEntityDto, ['timeline'] as const),
) {}

export class MonitorWithRegionsDto extends IntersectionType(
	MonitorFullDto,
	PickType(MonitorEntityDto, ['regions'] as const),
) {}

export class MonitorWithRegionsIdsDto extends IntersectionType(
	MonitorDto,
	PickType(MonitorEntityDto, ['regionIds'] as const),
) {}

export class BaseMonitorWithRegionsIdsDto extends IntersectionType(
	BaseMonitorDto,
	PickType(MonitorEntityDto, ['regionIds'] as const),
) {}
