'use client';

import { PAGES } from '@/config';
import { useUserStore } from '@/store';
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';

export function TanstackQueryProvider({
	children,
}: PropsWithChildren<unknown>) {
	const router = useRouter();

	const [client] = useState(
		new QueryClient({
			queryCache: new QueryCache({
				onError: (error: unknown) => {
					if (error instanceof AxiosError && error.response?.status === 401) {
						useUserStore.getState().removeUser();
						router.push(PAGES.LOGIN);
					}
				},
			}),
			mutationCache: new MutationCache({
				onError: (error: unknown) => {
					if (error instanceof AxiosError && error.response?.status === 401) {
						useUserStore.getState().removeUser();
						router.push(PAGES.LOGIN);
					}
				},
			}),
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: true,
					retry: (failureCount, error) => {
						if (error instanceof AxiosError && error.response?.status === 401) {
							return false;
						}
						if (error instanceof AxiosError && error.response?.status === 404) {
							return false;
						}
						return failureCount < 3;
					},
				},
			},
		}),
	);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
