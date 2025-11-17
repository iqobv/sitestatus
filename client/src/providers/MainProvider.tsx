'use client';

import { PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

export default function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<ThemeProvider>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	);
}
