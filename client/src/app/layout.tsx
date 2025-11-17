import MainProvider from '@/providers/MainProvider';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './index.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'Uptime Monitor',
		template: '%s - Uptime Monitor',
	},
	description: 'Monitor the uptime of your services easily.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable}`}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
}
