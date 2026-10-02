import { components } from '../schema';

type SwaggerNotificationType = components['schemas']['NotificationType'];

export const NotificationType = {
	MAINTENANCE: 'MAINTENANCE',
	UPDATE: 'UPDATE',
	NEWS: 'NEWS',
	INCIDENT: 'INCIDENT',
	RESOLVED: 'RESOLVED',
	DIRECT_MESSAGE: 'DIRECT_MESSAGE',
} as const satisfies Record<SwaggerNotificationType, SwaggerNotificationType>;

export type NotificationType =
	(typeof NotificationType)[keyof typeof NotificationType];
