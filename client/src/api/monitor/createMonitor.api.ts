import { CreateMonitorDto } from '@/dto';
import { BaseMonitor } from '@/types';
import { apiClient } from '../axios';

export const createMonitor = async (dto: CreateMonitorDto) =>
	(await apiClient.post<BaseMonitor>(`/v1/monitors/create`, dto)).data;
