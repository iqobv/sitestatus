'use client';

import { MonitorFull } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MonitorCard from '../MonitorCard/MonitorCard';
import styles from './MonitorOverall.module.scss';
import { OVERALL_MONITOR_CARDS_ITEMS } from './monitorOverallCards';

dayjs.extend(relativeTime);

interface MonitorOverallProps {
	monitor: MonitorFull;
}

const MonitorOverall = ({ monitor }: MonitorOverallProps) => {
	return (
		<div className={styles['monitor-overall']}>
			{OVERALL_MONITOR_CARDS_ITEMS.map(({ title, render }, index) => (
				<MonitorCard cardTitle={title} key={index}>
					{render(monitor)}
				</MonitorCard>
			))}
		</div>
	);
};

export default MonitorOverall;
