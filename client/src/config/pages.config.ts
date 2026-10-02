import { LEGAL_PAGES } from './legalPage.config';
import { PUBLIC_PAGES } from './publicPages.config';

export const PAGES = {
	HOME: PUBLIC_PAGES.HOME,
	...LEGAL_PAGES,
} as const;
