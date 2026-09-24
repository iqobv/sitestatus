'use client';

import { AUTH_PAGES } from '@/config/authPages.config';
import { env } from '@/env';
import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import axios, {
	AxiosError,
	InternalAxiosRequestConfig,
	isAxiosError,
} from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const url = env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
	baseURL: url,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: ApiMessageResponse | null = null) => {
	failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()));
	failedQueue = [];
};

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiMessageResponse>) => {
		const originalRequest = error.config as CustomAxiosRequestConfig;
		const requestUrl = originalRequest?.url || '';

		const isAuthEndpoint = Object.values(AUTH_PAGES).some((path) =>
			requestUrl.includes(path),
		);

		if (
			error.response?.status === 401 &&
			!isAuthEndpoint &&
			!originalRequest._retry
		) {
			if (isRefreshing)
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then(() => apiClient(originalRequest))
					.catch((err) => Promise.reject(err));

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				await axios.post(
					`${url}/v1/auth/refresh`,
					{},
					{ withCredentials: true },
				);

				processQueue(null);
				return apiClient(originalRequest);
			} catch (refreshError) {
				if (isAxiosError(refreshError))
					processQueue(refreshError.response?.data);

				if (typeof window !== 'undefined')
					window.dispatchEvent(new Event('auth:unauthorized'));

				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		if (error.response?.data?.message) {
			error.message = error.response.data.message;
			error.code = error.response.data.code;
		}

		return Promise.reject(error);
	},
);

export default apiClient;
