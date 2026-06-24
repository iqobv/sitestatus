export const MonitorStatus = {
	UP: 'UP',
	DOWN: 'DOWN',
	UNKNOWN: 'UNKNOWN',
} as const;

export type MonitorStatus = (typeof MonitorStatus)[keyof typeof MonitorStatus];
