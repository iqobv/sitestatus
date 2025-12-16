'use client';

import { IUser } from '@/types';
import AuthProvider from './AuthProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';

interface MainProviderProps {
	children: React.ReactNode;
	user: IUser | null;
}

export default function MainProvider({ children, user }: MainProviderProps) {
	return (
		<TanstackQueryProvider>
			<AuthProvider user={user}>
				<ThemeProvider>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	);
}
