import { CreateMonitorDto, UpdateMonitorDto } from '@/dto';
import { IMonitorWithPingResults } from '@/types';
import { fetcher } from '@/utils';

export const createMonitor = async (token: string, dto: CreateMonitorDto) =>
	await fetcher<IMonitorWithPingResults>('/api/v1/monitors/create', {
		method: 'POST',
		body: JSON.stringify(dto),
		token,
	});

export const getMonitors = async (token: string) =>
	await fetcher<IMonitorWithPingResults[]>('/api/v1/monitors/me', {
		token,
	});

export const getMonitorById = async (token: string, monitorId: string) =>
	await fetcher<IMonitorWithPingResults>(`/api/v1/monitors/id/${monitorId}`, {
		token,
	});

export const updateMonitor = async (
	token: string,
	monitorId: string,
	dto: UpdateMonitorDto
) =>
	await fetcher<IMonitorWithPingResults>(`/api/v1/monitors/${monitorId}`, {
		method: 'PATCH',
		body: JSON.stringify(dto),
		token,
	});
