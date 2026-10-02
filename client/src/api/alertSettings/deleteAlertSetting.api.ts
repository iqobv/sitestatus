import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteAlertSettingResponse =
	paths['/v1/alert-settings/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteAlertSetting = async (id: string) =>
	(
		await apiClient.delete<DeleteAlertSettingResponse>(
			`/v1/alert-settings/${id}`,
		)
	).data;
