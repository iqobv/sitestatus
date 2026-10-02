import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type TerminateSpecificSessionResponse =
	paths['/v1/sessions/id/{id}']['delete']['responses']['200']['content']['application/json'];
type TerminateAllOtherSessionsResponse =
	paths['/v1/sessions/all-other']['delete']['responses']['200']['content']['application/json'];

export const terminateSpecificSession = async (sessionId: string) =>
	(
		await apiClient.delete<TerminateSpecificSessionResponse>(
			`/v1/sessions/id/${sessionId}`,
		)
	).data;

export const terminateAllOtherSessions = async () =>
	(
		await apiClient.delete<TerminateAllOtherSessionsResponse>(
			`/v1/sessions/all-other`,
		)
	).data;
