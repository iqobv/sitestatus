import { LEGAL_PAGES, PUBLIC_PAGES } from '@/config';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://sitestatus.dev';

	const staticRoutes = [PUBLIC_PAGES.HOME, ...Object.values(LEGAL_PAGES)].map(
		(route) => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date().toISOString().split('T')[0],
			changeFrequency: 'monthly' as const,
			priority: route === PUBLIC_PAGES.HOME ? 1 : 0.8,
		}),
	);

	return staticRoutes;
}
