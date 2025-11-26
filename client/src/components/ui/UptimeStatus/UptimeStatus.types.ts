import { TMonitorStatus } from '@/types';

export interface UptimeStatusProps {
	status: TMonitorStatus | 'N/A' | 'PAUSED';
	showText?: boolean;
	textClassName?: string;
}
