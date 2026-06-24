'use client';

import { TableLoader } from '@/components/ui';
import styles from './MonitorsTable.module.scss';
import { MONITOR_COLUMNS } from './monitorsTableColumns';

export const MonitorsTableLoader = () => (
	<div className={styles.container}>
		<TableLoader columns={MONITOR_COLUMNS} countRows={10} />
	</div>
);
