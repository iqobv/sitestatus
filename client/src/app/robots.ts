import { LEGAL_PAGES } from '@/config/legalPage.config';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { PUBLIC_PAGES } from '@/config/publicPages.config';
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
