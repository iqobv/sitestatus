export const NotificationType = {
	MAINTENANCE: 'MAINTENANCE',
	UPDATE: 'UPDATE',
	NEWS: 'NEWS',
	INCIDENT: 'INCIDENT',
	RESOLVED: 'RESOLVED',
	DIRECT_MESSAGE: 'DIRECT_MESSAGE',
} as const;

export type NotificationType =
	(typeof NotificationType)[keyof typeof NotificationType];
