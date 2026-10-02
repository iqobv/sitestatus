import { components } from '../schema';

type SwaggerMettod = components['schemas']['Method'];

export const MonitorMethod = {
	GET: 'GET',
	OPTIONS: 'OPTIONS',
} as const satisfies Record<SwaggerMettod, SwaggerMettod>;

export type MonitorMethod = (typeof MonitorMethod)[keyof typeof MonitorMethod];
