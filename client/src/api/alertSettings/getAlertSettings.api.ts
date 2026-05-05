import { AlertSettings } from '@/types';
import { apiClient } from '../axios';

interface GetAlertSettingsHierarchyQuery {
	monitorId?: string;
	projectId?: string;
}

export const getAlertSettingsHierarchy = async (
	query?: GetAlertSettingsHierarchyQuery,
) =>
	(
		await apiClient.get<AlertSettings[]>('/v1/alert-settings/hierarchy', {
			params: query,
		})
	).data;
