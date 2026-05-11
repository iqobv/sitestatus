import { AllSessions } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getAllSessions = async () =>
	(await apiClient.get<AllSessions>('/v1/sessions')).data;

export const getServerAllSessions = async () =>
	(await apiServer.get<AllSessions>('/v1/sessions')).data;
