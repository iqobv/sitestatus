import { LoginDto, RegisterDto } from '@/dto';
import { User } from '@/types';
import { apiClient, apiServer } from '../axios';

export const login = async (dto: LoginDto) =>
	(await apiClient.post<User>(`/v1/auth/login`, dto)).data;

export const register = async (dto: RegisterDto) =>
	(
		await apiClient.post<{ message: string; email: string }>(
			`/v1/auth/register`,
			dto,
		)
	).data;

export const getProfile = async () =>
	(await apiClient.get<User>(`/v1/auth/me`)).data;

export const getServerProfile = async () =>
	(await apiServer.get<User>(`/v1/auth/me`)).data;

export const logout = async () =>
	(await apiClient.post(`/v1/auth/logout`)).data;
