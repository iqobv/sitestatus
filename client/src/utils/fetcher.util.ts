'use client';

interface FetcherOptions extends RequestInit {
	token?: string;
}

export const fetcher = async <T>(
	url: string,
	options: FetcherOptions = {}
): Promise<T> => {
	const { token, headers, ...restOptions } = options;

	const getHeaders = (accessToken?: string) => {
		const isFormData = restOptions.body instanceof FormData;
		return {
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
			...headers,
		};
	};

	const performRequest = async (accessToken?: string) => {
		return fetch(url, {
			...restOptions,
			credentials: 'include',
			headers: getHeaders(accessToken),
		});
	};

	let res = await performRequest(token);

	if (res.status === 401 && token) {
		try {
			const refreshRes = await fetch('/api/v1/auth/refresh', {
				method: 'POST',
				credentials: 'include',
			});

			if (refreshRes.ok) {
				const refreshData = await refreshRes.json();
				const newAccessToken = refreshData.accessToken;

				res = await performRequest(newAccessToken);
			}
		} catch (error) {
			console.error('Auto-refresh failed', error);
		}
	}

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
