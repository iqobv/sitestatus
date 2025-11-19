import { LoginDto, RegisterDto } from '@/dto';
import { ILoginResponse, IUser } from '@/types';
import { fetcher } from '@/utils';

export const login = async (data: LoginDto) =>
	await fetcher<ILoginResponse>('/api/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const register = async (data: RegisterDto) =>
	await fetcher<{ message: string; email: string }>('/api/v1/auth/register', {
		method: 'POST',
		body: JSON.stringify(data),
	});

export const refreshAuthToken = async (token?: string) =>
	await fetcher<ILoginResponse>('/api/v1/auth/refresh', {
		method: 'POST',
		token,
	});

export const getProfile = async (token: string) =>
	await fetcher<IUser>('/api/v1/auth/me', {
		method: 'GET',
		token,
	});

export const logout = async (token: string) =>
	await fetcher('/api/v1/auth/logout', { method: 'POST', token });
