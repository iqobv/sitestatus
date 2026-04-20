'use client';

import { Button } from '@/components/ui';
import { useUpdateTimer } from '@/hooks';
import { QueryKey } from '@tanstack/react-query';
import styles from './MonitorRefresh.module.scss';

interface MonitorRefreshProps {
	queryKey: QueryKey;
}

const MonitorRefresh = ({ queryKey }: MonitorRefreshProps) => {
	const { handleRefresh, timer } = useUpdateTimer({
		queryKey,
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
