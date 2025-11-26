import { IMonitorWithPingResults } from '@/types';
import { fetcher } from '@/utils';

export const getMonitors = async (token: string) =>
	await fetcher<IMonitorWithPingResults[]>('/api/v1/monitors/me', {
		token,
	});

export const getMonitorById = async (token: string, monitorId: string) =>
	await fetcher<IMonitorWithPingResults>(`/api/v1/monitors/id/${monitorId}`, {
		token,
	});
