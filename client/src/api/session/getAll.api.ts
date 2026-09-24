import { AllSessions } from '@/types/session/allSession.types';
import { apiClient } from '../axios';

export const getAllSessions = async () =>
	(await apiClient.get<AllSessions>('/v1/sessions')).data;
