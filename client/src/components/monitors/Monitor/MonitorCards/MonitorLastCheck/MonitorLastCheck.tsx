'use client';

import { UptimeStatus } from '@/components/ui';
import { MonitorWithPingResults } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './MonitorLastCheck.module.scss';

dayjs.extend(relativeTime);

interface MonitorLastCheckProps {
	monitor: MonitorWithPingResults;
}

const MonitorLastCheck = ({ monitor }: MonitorLastCheckProps) => {
	return (
		<div className={styles['monitor-last-check']}>
			<div>
				{monitor.lastCheckedAt
					? dayjs(monitor.lastCheckedAt).fromNow()
					: 'Never checked'}
			</div>
			<UptimeStatus status={monitor.lastStatus} />
		</div>
	);
};

export default MonitorLastCheck;
