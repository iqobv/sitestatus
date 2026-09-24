import { Region } from '@/types/region/region.types';
import { apiClient } from '../axios';

export const getAllRegions = async () =>
	(await apiClient.get<Region[]>('/v1/regions')).data;
