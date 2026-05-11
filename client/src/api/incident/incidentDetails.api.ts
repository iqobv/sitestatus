import { IncidentDetails } from '@/types';
import { apiClient } from '../axios';

export const getIncidentDetails = async (
	monitorId: string,
	incidentId: string,
) =>
	(
		await apiClient.get<IncidentDetails>(
			`/v1/incidents/monitor/${monitorId}/incident/${incidentId}`,
		)
	).data;
