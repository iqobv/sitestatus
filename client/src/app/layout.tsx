import MainProvider from '@/providers/MainProvider';
import { IUser } from '@/types';
import { serverFetcher } from '@/utils';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './index.scss';

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'SiteStatus',
		template: '%s - SiteStatus',
	},
	description: 'Monitor the uptime of your services easily.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await serverFetcher<IUser>('/v1/auth/me').catch(() => null);

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${roboto.variable}`}>
				<MainProvider user={user}>{children}</MainProvider>
			</body>
		</html>
	);
}
