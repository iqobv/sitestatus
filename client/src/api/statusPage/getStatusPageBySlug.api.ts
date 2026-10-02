import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetStatusPageBySlugResponse =
	paths['/v1/status-pages/slug/{slug}']['get']['responses']['200']['content']['application/json'];

export const getStatusPageBySlug = async (slug: string) =>
	(
		await apiClient.get<GetStatusPageBySlugResponse>(
			`/v1/status-pages/slug/${slug}`,
		)
	).data;
