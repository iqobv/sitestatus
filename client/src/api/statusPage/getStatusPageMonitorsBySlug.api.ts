import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetStatusPageMonitorsBySlugResponse =
	paths['/v1/status-pages/slug/{slug}/monitors']['get']['responses']['200']['content']['application/json'];

export const getStatusPageMonitorsBySlug = async (slug: string) =>
	(
		await apiClient.get<GetStatusPageMonitorsBySlugResponse>(
			`/v1/status-pages/slug/${slug}/monitors`,
		)
	).data;
