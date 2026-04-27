'use client';

import MonitorOverallUptimeBar from '@/components/monitors/Monitor/MonitorOverall/MonitorOverallUptimeBar/MonitorOverallUptimeBar';
import { UptimeStatus } from '@/components/ui';
import { MonitorWithTimeline } from '@/types';
import styles from './PublicPageService.module.scss';

interface PublicPageServiceProps {
	monitor: MonitorWithTimeline;
}

const PublicPageService = ({ monitor }: PublicPageServiceProps) => {
	return (
		<div className={styles.service}>
			<div className={styles.header}>
				<div className={styles.title}>
					<h3>{monitor.name}</h3>
					<UptimeStatus status={monitor.lastStatus} />
				</div>
				<p className={styles.uptime}>{monitor.uptime}</p>
			</div>
			<MonitorOverallUptimeBar timeline={monitor.timeline} />
		</div>
	);
};

export default PublicPageService;
