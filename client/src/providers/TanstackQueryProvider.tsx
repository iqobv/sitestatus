'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

export function TanstackQueryProvider({
	children,
}: PropsWithChildren<unknown>) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					refetchOnMount: true,
					retry(failureCount, error) {
						if (error instanceof Error && error.message.includes('404')) {
							return false;
						}
						return failureCount < 3;
					},
				},
			},
		})
	);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
