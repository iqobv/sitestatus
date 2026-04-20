import { CreateMonitorDto } from '@/dto';
import { Monitor } from '@/types';
import { apiClient } from '../axios';

export const createMonitor = async (dto: CreateMonitorDto) =>
	(await apiClient.post<Monitor>(`/v1/monitors/create`, dto)).data;
