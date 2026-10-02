'use client';

import { NuqsAdapter } from 'nuqs/adapters/next';
import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

export const MainProvider = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<NuqsAdapter>
			<TanstackQueryProvider>
				<ThemeProvider>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</TanstackQueryProvider>
		</NuqsAdapter>
	);
};
