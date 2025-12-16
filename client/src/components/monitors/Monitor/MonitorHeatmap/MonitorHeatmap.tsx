'use client';

import { IMonitorWithPingResults, TMonitorRange } from '@/types';
import { buildHeatmapCells } from '@/utils';
import { useMemo } from 'react';
import MonitorCard from '../MonitorCard/MonitorCard';
import styles from './MonitorHeatmap.module.scss';
import MonitorHeatmapCell from './MonitorHeatmapCell/MonitorHeatmapCell';

interface MonitorHeatmapProps {
	monitor: IMonitorWithPingResults;
	selectedRange: TMonitorRange;
}

const MonitorHeatmap = ({ monitor, selectedRange }: MonitorHeatmapProps) => {
	const cells = useMemo(
		() =>
			buildHeatmapCells(
				monitor.pingResults,
				selectedRange,
				monitor.checkIntervalSeconds
			),
		[monitor, selectedRange]
	);

	return (
		<MonitorCard
			cardTitle="Monitor Heatmap"
			tooltip={
				"This heatmap visualizes the monitor's uptime and downtime over the selected range. Each cell represents a time interval, with colors indicating the status (e.g., green for uptime, red for downtime)."
			}
		>
			<div
				className={`${styles['heatmap__content']} ${
					styles[`heatmap__content--${selectedRange.toLowerCase()}`]
				}`}
			>
				{cells.map((cell) => (
					<MonitorHeatmapCell key={cell.from.toISOString()} cell={cell} />
				))}
			</div>
		</MonitorCard>
	);
};

export default MonitorHeatmap;
