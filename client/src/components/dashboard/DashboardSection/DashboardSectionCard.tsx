'use client';

import { Button } from '@/components/ui';
import styles from './DashboardSection.module.scss';

export interface DashboardSectionCardProps {
	title: React.ReactNode;
	href: string;
}

export const DashboardSectionCard = ({
	title,
	href,
}: DashboardSectionCardProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.title}>{title}</div>
			<Button href={href} variant="link">
				View
			</Button>
		</div>
	);
};
