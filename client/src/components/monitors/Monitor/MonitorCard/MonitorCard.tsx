'use client';

import { Tooltip } from '@/components/ui';
import { MdInfoOutline } from 'react-icons/md';
import styles from './MonitorCard.module.scss';

interface MonitorCardProps {
	children: React.ReactNode;
	cardTitle: string;
	className?: string;
	tooltip?: string;
}

const MonitorCard = ({
	children,
	cardTitle,
	className,
	tooltip,
}: MonitorCardProps) => {
	return (
		<div className={`card ${className || ''}`}>
			<div className={styles['monitor-card__header']}>
				<p className={`${styles['monitor-card__title']}`}>{cardTitle}</p>
				{tooltip && (
					<Tooltip>
						<Tooltip.Trigger>
							<MdInfoOutline />
						</Tooltip.Trigger>
						<Tooltip.Content>{tooltip}</Tooltip.Content>
					</Tooltip>
				)}
			</div>
			{children}
		</div>
	);
};

export default MonitorCard;
