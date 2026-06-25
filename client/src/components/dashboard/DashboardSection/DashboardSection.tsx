'use client';

import { Button, SectionHeader, Sepator } from '@/components/ui';
import { IconType } from 'react-icons';
import styles from './DashboardSection.module.scss';
import {
	DashboardSectionCard,
	DashboardSectionCardProps,
} from './DashboardSectionCard';

export interface DashboardSectionProps {
	title: string;
	description?: string;
	href?: string;
	emptyIcon: IconType;
	emptyText: string;
	items?: DashboardSectionCardProps[];
	createHref?: string;
	createButtonText?: string;
}

export const DashboardSection = ({
	title,
	description,
	href,
	emptyText,
	emptyIcon,
	items,
	createButtonText,
	createHref,
}: DashboardSectionProps) => {
	const EmptyIcon = emptyIcon;

	return (
		<div className={styles.section}>
			<SectionHeader
				title={title}
				description={description}
				padding={0}
				titleProps={{
					variant: 'h2',
				}}
				{...(href && {
					rightSlot: (
						<Button href={href} variant="secondary">
							View All
						</Button>
					),
				})}
			/>
			<Sepator />
			<div className={styles.content}>
				{items && items.length > 0 ? (
					<div className={styles.list}>
						{items.map((item) => (
							<DashboardSectionCard
								key={item.href}
								title={item.title}
								href={item.href}
							/>
						))}
					</div>
				) : (
					<div className={styles.empty}>
						<div className={styles.emptyContent}>
							<EmptyIcon className={styles.icon} size={48} />
							<div>{emptyText}</div>
						</div>
						{createButtonText && createHref && (
							<Button href={createHref} variant="secondary">
								{createButtonText}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
