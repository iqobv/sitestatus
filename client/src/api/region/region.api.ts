import { Region } from '@/types/region';
import { apiClient, apiServer } from '../axios';

export const getAllRegions = async () =>
	(await apiClient.get<Region[]>('/v1/regions')).data;

export const getServerAllRegions = async () =>
	(await apiServer.get<Region[]>('/v1/regions')).data;
