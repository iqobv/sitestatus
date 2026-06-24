import { PublicStatusPageMonitor } from '@/types/statusPage/publicStatusPage.types';
import { apiClient } from '../axios';

export const getStatusPageMonitorsBySlug = async (slug: string) =>
	(
		await apiClient.get<PublicStatusPageMonitor[]>(
			`/v1/status-pages/slug/${slug}/monitors`,
		)
	).data;
