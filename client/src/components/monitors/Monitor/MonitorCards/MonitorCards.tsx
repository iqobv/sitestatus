'use client';

import { MonitorAnalytics } from '@/types';
import MonitorCard from '../MonitorCard/MonitorCard';
import styles from './MonitorCards.module.scss';
import { MONITORS_CARDS_ITEMS } from './monitorCardsItems';

interface MonitorCardsProps {
	monitor: MonitorAnalytics;
}

const MonitorCards = ({ monitor }: MonitorCardsProps) => {
	return (
		<div className={styles['monitor-cards']}>
			{MONITORS_CARDS_ITEMS.map((item) => (
				<MonitorCard
					cardTitle={item.title}
					key={item.title}
					tooltip={item.tooltip}
				>
					{item.render(monitor)}
				</MonitorCard>
			))}
		</div>
	);
};

export default MonitorCards;
