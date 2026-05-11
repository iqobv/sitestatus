'use client';

import { Tooltip } from '@/components/ui';
import { MonitorTimeline } from '@/types';
import React from 'react';
import styles from './MonitorOverallUptimeBar.module.scss';

interface MonitorOverallUptimeBarItemProps {
	entry: MonitorTimeline;
}

const MonitorOverallUptimeBarItem = ({
	entry,
}: MonitorOverallUptimeBarItemProps) => {
	const dtf = new Intl.DateTimeFormat(undefined, {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	return (
		<Tooltip>
			<Tooltip.Trigger>
				<div
					className={styles.uptimeBarItem}
					style={
						{
							'--bar-color': `var(--status-${entry.status.toLowerCase()})`,
							'--bar-color-hover': `var(--status-${entry.status.toLowerCase()}-hover)`,
						} as React.CSSProperties
					}
				/>
			</Tooltip.Trigger>
			<Tooltip.Content className={styles.tooltip}>
				<p>{dtf.format(new Date(entry.timestamp))}</p>
				<p className={styles.tooltipStatus}>{entry.status.toLowerCase()}</p>
			</Tooltip.Content>
		</Tooltip>
	);
};

export default MonitorOverallUptimeBarItem;
