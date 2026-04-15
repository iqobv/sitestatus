'use client';

import { MonitorResponseStatistics } from '@/types';
import MonitorCard from '../MonitorCard/MonitorCard';
import styles from './MonitorResponseCards.module.scss';
import { MONITOR_RESPONSE_CARDS_ITEMS } from './monitorResponseCardsItems';

interface MonitorResponseCardsProps {
	responseStatistics: MonitorResponseStatistics;
}

const MonitorResponseCards = ({
	responseStatistics,
}: MonitorResponseCardsProps) => {
	return (
		<div className={styles['monitor-response-cards']}>
			{MONITOR_RESPONSE_CARDS_ITEMS.map((item, index) => (
				<MonitorCard key={index} cardTitle={item.title}>
					{item.render(responseStatistics)}
				</MonitorCard>
			))}
		</div>
	);
};

export default MonitorResponseCards;
