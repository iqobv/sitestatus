'use client';

import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useUpdateTimer } from '@/hooks';
import styles from './MonitorRefresh.module.scss';

const MonitorRefresh = () => {
	const { handleRefresh, timer } = useUpdateTimer({
		queryKey: QUERY_KEYS.monitors.list,
		isActive: true,
	});

	return (
		<div className={styles['monitors__header']}>
			<p>Auto refresh after {timer} seconds</p>
			<Button size="sm" variant="link" onClick={handleRefresh}>
				Refresh now
			</Button>
		</div>
	);
};

export default MonitorRefresh;
