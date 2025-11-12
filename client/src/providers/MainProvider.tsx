'use client';

import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

export default function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider>
				<ToastProvider>{children}</ToastProvider>
			</ThemeProvider>
		</TanstackQueryProvider>
	);
}
