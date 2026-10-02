import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllRegionsResponse =
	paths['/v1/regions']['get']['responses']['200']['content']['application/json'];

export const getAllRegions = async () =>
	(await apiClient.get<GetAllRegionsResponse>('/v1/regions')).data;
