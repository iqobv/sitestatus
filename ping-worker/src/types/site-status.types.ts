import { SITE_STATUS } from '../constants/site-status.constants.js';

export type SiteStatus = (typeof SITE_STATUS)[keyof typeof SITE_STATUS];
