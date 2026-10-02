import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAlertSettingsHierarchyResponse =
	paths['/v1/alert-settings/hierarchy']['get']['responses']['200']['content']['application/json'];

interface GetAlertSettingsHierarchyQuery {
	monitorId?: string;
	projectId?: string;
}

export const getAlertSettingsHierarchy = async (
	query?: GetAlertSettingsHierarchyQuery,
) =>
	(
		await apiClient.get<GetAlertSettingsHierarchyResponse>(
			'/v1/alert-settings/hierarchy',
			{
				params: query,
			},
		)
	).data;
