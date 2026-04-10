'use client';

import { MonitorMainInfo } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MonitorCard from '../MonitorCard/MonitorCard';
import styles from './MonitorOverall.module.scss';
import { OVERALL_MONITOR_CARDS_ITEMS } from './MonitorOverallCards';

dayjs.extend(relativeTime);

interface MonitorOverallProps {
	monitor: MonitorMainInfo;
}

const MonitorOverall = ({ monitor }: MonitorOverallProps) => {
	return (
		<div className={styles['monitor-overall']}>
			{OVERALL_MONITOR_CARDS_ITEMS.map(({ title, render }, index) => (
				<MonitorCard cardTitle={title} key={index}>
					{render(monitor)}
				</MonitorCard>
			))}
			{/* <MonitorCard cardTitle="Last Status">
				<div>{monitor.lastStatus}</div>
			</MonitorCard>
			<MonitorCard cardTitle="Last Checked">
				<div>{dayjs(monitor.lastCheckedAt).fromNow()}</div>
			</MonitorCard>
			<MonitorCard cardTitle="Uptime Last 24H">
				<MonitorOverallUptimeBar timeline={monitor.timeline} />
			</MonitorCard> */}
		</div>
	);
};

export default MonitorOverall;
