'use client';

import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useUpdateTimer } from '@/hooks';
import { MonitorWithRegions } from '@/types';
import styles from './MonitorRefreshTimer.module.scss';

interface MonitorRefreshTimerProps {
	monitor: MonitorWithRegions;
}

const MonitorRefreshTimer = ({ monitor }: MonitorRefreshTimerProps) => {
	const { timer, handleRefresh } = useUpdateTimer({
		queryKey: QUERY_KEYS.monitors.byId(monitor.id),
		isActive: monitor.isActive,
		initialTime: 60,
	});

	return (
		<div className={styles['refresh-timer']}>
			{monitor.isActive && (
				<>
					<div>Auto-refresh in {timer}s</div>
					<Button onClick={handleRefresh} variant="link" size="sm">
						Refresh Now
					</Button>
				</>
			)}
		</div>
	);
};

export default MonitorRefreshTimer;
