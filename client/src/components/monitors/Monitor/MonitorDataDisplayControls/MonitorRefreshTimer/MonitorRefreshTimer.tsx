'use client';

import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useUpdateTimer } from '@/hooks';
import styles from './MonitorRefreshTimer.module.scss';

interface MonitorRefreshTimerProps {
	monitorId: string;
}

const MonitorRefreshTimer = ({ monitorId }: MonitorRefreshTimerProps) => {
	const { timer, handleRefresh } = useUpdateTimer({
		queryKey: QUERY_KEYS.monitors.byId(monitorId),
		initialTime: 60,
	});

	return (
		<div className={styles['refresh-timer']}>
			<div>Auto-refresh in {timer}s</div>
			<Button onClick={handleRefresh} variant="link" size="sm">
				Refresh Now
			</Button>
		</div>
	);
};

export default MonitorRefreshTimer;
