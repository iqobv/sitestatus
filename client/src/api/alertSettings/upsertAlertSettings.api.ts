import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpsertAlertSettingsResponse =
	paths['/v1/alert-settings']['post']['responses']['200']['content']['application/json'];

export const upsertAlertSettings = async (dto: UpsertAlertSettingsDto) =>
	(await apiClient.post<UpsertAlertSettingsResponse>('/v1/alert-settings', dto))
		.data;
