'use client';

import { IMonitorWithPingResults } from '@/types';
import styles from './MonitorStatusBreakdown.module.scss';
import { useMonitorStatusBreakdown } from './useMonitorStatusBreakdown.hook';

interface MonitorStatusBreakdownProps {
	monitor: IMonitorWithPingResults;
}

const MonitorStatusBreakdown = ({ monitor }: MonitorStatusBreakdownProps) => {
	const { codes } = useMonitorStatusBreakdown(monitor);

	return (
		<>
			{codes.length === 0 && <p>No ping results available.</p>}
			{codes.length > 0 && (
				<ul className={styles['status-breakdown__list']}>
					{codes.map(({ code, percentage }) => (
						<li key={code} className={styles['status-breakdown__item']}>
							<span>{code}</span>
							<span className={styles['status-breakdown__percentage']}>
								{percentage.toFixed(0)}%
							</span>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default MonitorStatusBreakdown;
