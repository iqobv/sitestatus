'use client';

import MonitorOverallUptimeBar from '@/components/monitors/Monitor/MonitorOverall/MonitorOverallUptimeBar/MonitorOverallUptimeBar';
import { UptimeStatus } from '@/components/ui';
import { PublicStatusPageMonitor } from '@/types';
import styles from './StatusPageMonitor.module.scss';

interface StatusPageMonitorProps {
	monitor: PublicStatusPageMonitor;
}

const StatusPageMonitor = ({ monitor }: StatusPageMonitorProps) => {
	return (
		<div className={styles.monitor}>
			<div className={styles.header}>
				<div className={styles.title}>
					<h3>{monitor.displayName}</h3>
					<UptimeStatus status={monitor.lastStatus} />
				</div>
				<p className={styles.uptime}>{monitor.uptime}</p>
			</div>
			<MonitorOverallUptimeBar timeline={monitor.timeline} />
		</div>
	);
};

export default StatusPageMonitor;
