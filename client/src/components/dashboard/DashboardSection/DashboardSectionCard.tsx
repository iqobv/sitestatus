'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
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
			<Button variant="link" asChild>
				<Link href={href}>View</Link>
			</Button>
		</div>
	);
};
