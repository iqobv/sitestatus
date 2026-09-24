import { MetadataRoute } from 'next';
import { PAGES } from './pages.config';

type PageRoute = (typeof PAGES)[keyof typeof PAGES];

type RouteMetadata = Omit<MetadataRoute.Sitemap[number], 'url'>;

export const pagesMetadata: Partial<Record<PageRoute, RouteMetadata>> = {
	[PAGES.HOME]: {
		changeFrequency: 'monthly',
		priority: 1,
		lastModified: '2026-09-18',
	},
	[PAGES.TERMS_OF_SERVICE]: {
		changeFrequency: 'yearly',
		lastModified: '2026-04-28',
		priority: 0.5,
	},
	[PAGES.PRIVACY_POLICY]: {
		changeFrequency: 'yearly',
		lastModified: '2026-04-28',
		priority: 0.5,
	},
	[PAGES.COOKIE_POLICY]: {
		changeFrequency: 'yearly',
		lastModified: '2026-09-01',
		priority: 0.5,
	},
};
