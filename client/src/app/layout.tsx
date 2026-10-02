import { CookieBanner } from '@/components/analytics/CookieBanner/CookieBanner';
import { GoogleAnalyticsHandler } from '@/components/analytics/GoogleAnalyticsHandler';
import { titleConfig } from '@/config/title.config';
import { env } from '@/env';
import { MainProvider } from '@/providers/MainProvider';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';
import './index.scss';

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
});

const baseUrl = env.NEXT_PUBLIC_CLIENT_URL;

export const viewport: Viewport = {
	themeColor: '#ececec',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	interactiveWidget: 'resizes-content',
};

const { name, separator } = titleConfig;

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: name,
		template: `%s ${separator} ${name}`,
	},
	description: 'SiteStatus - Monitor the uptime of your services easily.',
	applicationName: name,
	keywords: [
		'uptime',
		'monitoring',
		'status',
		'website',
		'service',
		'availability',
	],
	appleWebApp: {
		title: name,
		capable: true,
		statusBarStyle: 'default',
	},
	openGraph: {
		title: 'SiteStatus',
		description: 'Monitor the uptime of your services easily.',
		url: baseUrl,
		siteName: 'SiteStatus',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'SiteStatus preview image',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SiteStatus',
		description: 'Monitor the uptime of your services easily.',
		images: ['/og-image.jpg'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							const update = () => document.documentElement.dataset.scrolled = window.scrollY > 150;
							window.addEventListener('scroll', update);
							update();
						`,
					}}
				/>
			</head>
			<body className={roboto.variable}>
				<MainProvider>{children}</MainProvider>
				<Suspense fallback={null}>
					<GoogleAnalyticsHandler />
				</Suspense>
				<CookieBanner />
			</body>
		</html>
	);
}
