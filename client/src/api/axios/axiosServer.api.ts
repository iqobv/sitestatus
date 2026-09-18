'use server';

import { AUTH_PAGES } from '@/config/authPages.config';
import { env } from '@/env';
import { ApiErrorResponse } from '@/types/api/messageResponse.api';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import https from 'https';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const apiServer = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	httpsAgent: new https.Agent({
		rejectUnauthorized: env.NODE_ENV !== 'development',
	}),
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
		return Promise.reject(error);
	},
);

apiServer.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorResponse>) => {
		const requestUrl = error.config?.url || '';

		const isAuthEndpoint = Object.values(AUTH_PAGES).some((path) =>
			requestUrl.includes(path),
		);

		if (error.response?.status === 401 && !isAuthEndpoint) {
			redirect(AUTH_PAGES.LOGIN);
		}

		if (error.response?.data?.message) {
			error.message = error.response.data.message;
		}

		return Promise.reject(error);
	},
);

export default apiServer;
