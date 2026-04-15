import { MonitorStatus } from '@/types';

export interface UptimeStatusProps {
	status: MonitorStatus | 'N/A' | 'PAUSED';
	showText?: boolean;
	textClassName?: string;
}
