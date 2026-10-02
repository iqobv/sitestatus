import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetIncidentDetailsResponse =
	paths['/v1/incidents/monitor/{monitorId}/incident/{incidentId}']['get']['responses']['200']['content']['application/json'];

export const getIncidentDetails = async (
	monitorId: string,
	incidentId: string,
) =>
	(
		await apiClient.get<GetIncidentDetailsResponse>(
			`/v1/incidents/monitor/${monitorId}/incident/${incidentId}`,
		)
	).data;
