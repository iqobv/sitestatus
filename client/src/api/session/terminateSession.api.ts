import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const terminateSpecificSession = async (sessionId: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/sessions/id/${sessionId}`))
		.data;

export const terminateAllOtherSessions = async () =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/sessions/all-other`)).data;
