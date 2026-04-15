'use server';

import { AUTH_PAGES } from '@/config';
import { ApiErrorResponse } from '@/types';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const apiServer = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

apiServer.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore.toString();

		if (cookieHeader) {
			config.headers.set('Cookie', cookieHeader);
		}

		return config;
	},
	(error: AxiosError<ApiErrorResponse>) => {
		Promise.reject(error);
	},
);

apiServer.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorResponse>) => {
		if (error.response?.status === 401) {
			redirect(AUTH_PAGES.LOGIN);
		}
	},
);

export default apiServer;
