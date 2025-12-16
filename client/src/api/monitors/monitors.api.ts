import { CreateMonitorDto, UpdateMonitorDto } from '@/dto';
import { IMonitorWithPingResults } from '@/types';
import { fetcher } from '@/utils';

export const createMonitor = async (dto: CreateMonitorDto) =>
	await fetcher<IMonitorWithPingResults>('/api/v1/monitors/create', {
		method: 'POST',
		body: JSON.stringify(dto),
	});

export const getMonitors = async () =>
	await fetcher<IMonitorWithPingResults[]>('/api/v1/monitors/me');

export const getMonitorById = async (monitorId: string) =>
	await fetcher<IMonitorWithPingResults>(`/api/v1/monitors/id/${monitorId}`);

export const updateMonitor = async (monitorId: string, dto: UpdateMonitorDto) =>
	await fetcher<IMonitorWithPingResults>(`/api/v1/monitors/${monitorId}`, {
		method: 'PATCH',
		body: JSON.stringify(dto),
	});
