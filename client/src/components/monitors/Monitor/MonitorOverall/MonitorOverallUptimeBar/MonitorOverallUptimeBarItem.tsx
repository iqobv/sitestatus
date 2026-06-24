'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { MonitorTimeline } from '@/types';
import React from 'react';
import styles from './MonitorOverallUptimeBar.module.scss';

interface MonitorOverallUptimeBarItemProps {
	entry: MonitorTimeline;
}

export const MonitorOverallUptimeBarItem = ({
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
			<TooltipTrigger>
				<div
					className={styles.uptimeBarItem}
					style={
						{
							'--bar-color': `var(--status-${entry.status.toLowerCase()})`,
							'--bar-color-hover': `var(--status-${entry.status.toLowerCase()}-hover)`,
						} as React.CSSProperties
					}
				/>
			</TooltipTrigger>
			<TooltipContent className={styles.tooltip}>
				<p>{dtf.format(new Date(entry.timestamp))}</p>
				<p className={styles.tooltipStatus}>{entry.status.toLowerCase()}</p>
			</TooltipContent>
		</Tooltip>
	);
};
