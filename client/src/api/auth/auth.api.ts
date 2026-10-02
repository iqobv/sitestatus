import { LoginDto, RegisterDto } from '@/dto/auth.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type LoginResponse =
	paths['/v1/auth/login']['post']['responses']['200']['content']['application/json'];
type RegisterResponse =
	paths['/v1/auth/register']['post']['responses']['200']['content']['application/json'];
type GetUserResponse =
	paths['/v1/auth/me']['get']['responses']['200']['content']['application/json'];
type LogoutResponse =
	paths['/v1/auth/logout']['post']['responses']['200']['content']['application/json'];

export const login = async (dto: LoginDto) =>
	(await apiClient.post<LoginResponse>(`/v1/auth/login`, dto)).data;

export const register = async (dto: RegisterDto) =>
	(await apiClient.post<RegisterResponse>(`/v1/auth/register`, dto)).data;

export const getUser = async () =>
	(await apiClient.get<GetUserResponse>(`/v1/auth/me`)).data;

export const logout = async () =>
	(await apiClient.post<LogoutResponse>(`/v1/auth/logout`)).data;
