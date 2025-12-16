'use client';

export const fetcher = async <T>(
	url: string,
	options: RequestInit = {}
): Promise<T> => {
	const { headers, ...restOptions } = options;

	const getHeaders = () => {
		const isFormData = restOptions.body instanceof FormData;
		return {
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...headers,
		};
	};

	const performRequest = async () => {
		return fetch(url, {
			...restOptions,
			credentials: 'include',
			headers: getHeaders(),
		});
	};

	const res = await performRequest();

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

	const text = await res.text();
	if (!text) return null as T;

	try {
		return JSON.parse(text) as T;
	} catch {
		return text as unknown as T;
	}
};
