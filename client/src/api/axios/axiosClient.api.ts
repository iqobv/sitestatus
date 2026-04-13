'use client';

import { PAGES } from '@/config';
import { useUserStore } from '@/store';
import { ApiErrorResponse } from '@/types';
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorResponse>) => {
		if (error.response?.status === 401) {
			useUserStore.getState().removeUser();
			if (typeof window !== undefined) {
				window.location.href = PAGES.LOGIN;
			}
		}

		return Promise.reject(error);
	},
);

export default apiClient;
