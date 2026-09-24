import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'SiteStatus',
		short_name: 'SiteStatus',
		description:
			'SiteStatus is a web application that provides real-time monitoring and status updates for websites and online services. It allows users to track the uptime, performance, and availability of their favorite websites, ensuring they stay informed about any issues or outages.',
		start_url: CROSS_DOMAIN_ROUTES.APP_DASHBOARD,
		display: 'standalone',
		background_color: '#0a0a0a',
		theme_color: '#ececec',
		icons: [
			{
				src: '/icons/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icons/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
