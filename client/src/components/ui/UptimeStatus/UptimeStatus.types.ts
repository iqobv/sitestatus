import { MonitorStatus } from '@/types/monitors/monitorStatus.types';

export interface UptimeStatusProps {
	status: MonitorStatus | 'N/A' | 'PAUSED';
	showText?: boolean;
	textClassName?: string;
}
