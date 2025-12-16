'use client';

import { Tooltip, UptimeStatus } from '@/components/ui';
import { IHeatmapCell } from '@/types';
import { useRef, useState } from 'react';
import styles from './MonitorHeatmapCell.module.scss';

interface MonitorHeatmapCellProps {
	cell: IHeatmapCell;
}

const MonitorHeatmapCell = ({ cell }: MonitorHeatmapCellProps) => {
	const [isShown, setIsShown] = useState(false);
	const cellRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter = () => {
		setIsShown(true);
	};

	const handleMouseLeave = () => {
		setIsShown(false);
	};

	return (
		<>
			<div
				key={cell.from.toISOString()}
				className={`${styles['heatmap__cell']}  ${
					isShown ? styles['heatmap__cell--hovered'] : ''
				}`}
				ref={cellRef}
				style={{
					backgroundColor:
						cell.status === 'DOWN'
							? 'var(--status-down)'
							: cell.avgResponse === null
							? 'var(--skeleton-color)'
							: cell.avgResponse < 300
							? 'var(--heatmap-fast)'
							: cell.avgResponse < 1000
							? 'var(--heatmap-medium)'
							: 'var(--heatmap-slow)',
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
			{isShown && (
				<Tooltip targetRef={cellRef} className={styles['heatmap__tooltip']}>
					<p>
						{cell.from.toLocaleString()} – {cell.to.toLocaleTimeString()}
					</p>
					<UptimeStatus status={cell.status || 'N/A'} />
					<p>
						{cell.avgResponse !== null
							? `${cell.avgResponse.toFixed(0)}ms`
							: ''}
					</p>
				</Tooltip>
			)}
		</>
	);
};

export default MonitorHeatmapCell;
