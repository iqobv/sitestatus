import { LoginDto, RegisterDto } from '@/dto';
import { IUser } from '@/types';
import { fetcher } from '@/utils';

export const login = async (dto: LoginDto) =>
	await fetcher<IUser>('/api/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify(dto),
	});

export const register = async (dto: RegisterDto) =>
	await fetcher<{ message: string; email: string }>('/api/v1/auth/register', {
		method: 'POST',
		body: JSON.stringify(dto),
	});

export const getProfile = async () =>
	await fetcher<IUser>('/api/v1/auth/me', {
		method: 'GET',
	});

export const logout = async () =>
	await fetcher('/api/v1/auth/logout', { method: 'POST' });
