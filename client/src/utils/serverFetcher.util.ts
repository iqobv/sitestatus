'use server';

import { cookies } from 'next/headers';

export const serverFetcher = async <T>(
	url: string,
	options?: RequestInit
): Promise<T> => {
	const cookiesStore = await cookies();
	const hasSession = cookiesStore.has('sid');
	const allCookies = cookiesStore.toString();

	const fetchOptions: RequestInit = {
		...options,
		headers: {
			...options?.headers,
			cookie: hasSession ? allCookies : '',
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	};

	try {
		const res = await fetch(`${process.env.API_URL}${url}`, fetchOptions);

		if (!res.ok) {
			let errorMessage = 'Something went wrong';
			try {
				const errorData = await res.json();
				errorMessage = errorData.message || res.statusText;
			} catch {
				errorMessage = res.statusText;
			}
			throw new Error(errorMessage);
		}

		const data = await res.json();
		if (!data) return null as T;

		return data as T;
	} catch (error) {
		throw error;
	}
};
