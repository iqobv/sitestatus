import { IUser } from '@/types';
import { fetcher } from '@/utils';

export const login = async (email: string, password: string) =>
	await fetcher<{ accessToken: string }>('/api/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

export const register = async (email: string, password: string) =>
	await fetcher<{ message: string }>('/api/v1/auth/register', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	});

export const refreshAuthToken = async (token?: string) =>
	await fetcher<{ accessToken: string }>(
		'/api/v1/auth/refresh',
		{ method: 'POST' },
		token
	);

export const getProfile = async (token: string) =>
	await fetcher<IUser>(
		'/api/v1/auth/me',
		{
			method: 'GET',
		},
		token
	);

export const logout = async (token: string) =>
	await fetcher('/api/v1/auth/logout', { method: 'POST' }, token);
