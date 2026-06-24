'use client';

import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useUpdateTimer } from '@/hooks/useUpdateTimer.hook';
import { MonitorWithRegions } from '@/types/monitors/monitor.types';
import styles from './MonitorRefreshTimer.module.scss';

interface MonitorRefreshTimerProps {
	monitor: MonitorWithRegions;
}

export const MonitorRefreshTimer = ({ monitor }: MonitorRefreshTimerProps) => {
	const { timer, handleRefresh } = useUpdateTimer({
		queryKey: QUERY_KEYS.monitors.detail(monitor.id),
		isActive: monitor.isActive,
		initialTime: 60,
	});

	return (
		<div className={styles.timer}>
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
