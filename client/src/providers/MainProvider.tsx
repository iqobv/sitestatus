'use client';

import { User } from '@/types/user/user.types';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { AuthProvider } from './AuthProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';

interface MainProviderProps {
	children: React.ReactNode;
	user: User | null;
}

export const MainProvider = ({ children, user }: MainProviderProps) => {
	return (
		<NuqsAdapter>
			<TanstackQueryProvider>
				<AuthProvider user={user}>
					<ThemeProvider>
						<ToastProvider>{children}</ToastProvider>
					</ThemeProvider>
				</AuthProvider>
			</TanstackQueryProvider>
		</NuqsAdapter>
	);
};
