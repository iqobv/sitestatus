import { getAllMonitors } from '@/api/monitor/getAllMonitors.api';
import {
	getMonitorById,
	getMonitorByIdFull,
} from '@/api/monitor/getMonitorById.api';
import { components } from '../schema';

export type BaseMonitor = components['schemas']['BaseMonitorDto'];

export type FullMonitor = Awaited<
	ReturnType<typeof getAllMonitors>
>['data'][number];

export type MonitorWithRegions = Awaited<ReturnType<typeof getMonitorByIdFull>>;

export type MonitorWithRegionsIds = Awaited<ReturnType<typeof getMonitorById>>;

export type PaginatedMonitors = Awaited<ReturnType<typeof getAllMonitors>>;
