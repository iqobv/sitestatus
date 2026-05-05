import { UpsertAlertSettingsDto } from '@/dto';
import { AlertSettings } from '@/types';
import { apiClient } from '../axios';

export const upsertAlertSettings = async (dto: UpsertAlertSettingsDto) =>
	(await apiClient.post<AlertSettings>('/v1/alert-settings', dto)).data;
