import { components } from '../schema';

type SwaggerStatus = components['schemas']['SiteStatus'];

export const MonitorStatus = {
	UP: 'UP',
	DOWN: 'DOWN',
	UNKNOWN: 'UNKNOWN',
} as const satisfies Record<SwaggerStatus, SwaggerStatus>;

export type MonitorStatus = (typeof MonitorStatus)[keyof typeof MonitorStatus];
