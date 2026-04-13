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
					className={styles['monitor-overall-uptime-bar__item']}
					style={
						{
							'--bar-color': `var(--status-${entry.status.toLowerCase()})`,
							'--bar-color-hover': `var(--status-${entry.status.toLowerCase()}-hover)`,
						} as React.CSSProperties
					}
				/>
			</Tooltip.Trigger>
			<Tooltip.Content
				className={styles['monitor-overall-uptime-bar__item-tooltip']}
			>
				<p>{dtf.format(new Date(entry.timestamp))}</p>
				<p
					className={styles['monitor-overall-uptime-bar__item-tooltip-status']}
				>
					{entry.status}
				</p>
			</Tooltip.Content>
		</Tooltip>
	);
};

export default MonitorOverallUptimeBarItem;
