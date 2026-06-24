import { CreateMonitorDto } from '@/dto/monitor.dto';
import { BaseMonitor } from '@/types/monitors/monitor.types';
import { apiClient } from '../axios';

export const createMonitor = async (dto: CreateMonitorDto) =>
	(await apiClient.post<BaseMonitor>(`/v1/monitors/create`, dto)).data;
