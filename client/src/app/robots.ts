import { LEGAL_PAGES, PRIVATE_PAGES, PUBLIC_PAGES } from '@/config';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = 'https://sitestatus.dev';

	return {
		rules: {
			userAgent: '*',
			allow: [PUBLIC_PAGES.HOME, ...Object.values(LEGAL_PAGES)],
			disallow: [`${PRIVATE_PAGES.DASHBOARD}/`, '/api/', '/auth/'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
