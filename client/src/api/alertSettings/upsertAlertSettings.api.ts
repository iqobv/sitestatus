import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
import { AlertSettings } from '@/types/alertSettings/alertSettings.types';
import { apiClient } from '../axios';

export const upsertAlertSettings = async (dto: UpsertAlertSettingsDto) =>
	(await apiClient.post<AlertSettings>('/v1/alert-settings', dto)).data;
