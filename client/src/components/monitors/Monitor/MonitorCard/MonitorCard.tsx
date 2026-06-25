'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { MdInfoOutline } from 'react-icons/md';
import styles from './MonitorCard.module.scss';

interface MonitorCardProps {
	children: React.ReactNode;
	cardTitle: string;
	className?: string;
	tooltip?: string;
}

export const MonitorCard = ({
	children,
	cardTitle,
	className,
	tooltip,
}: MonitorCardProps) => {
	return (
		<div className={`card ${className || ''}`}>
			<div className={styles.header}>
				<p className={`${styles.title}`}>{cardTitle}</p>
				{tooltip && (
					<Tooltip>
						<TooltipTrigger>
							<MdInfoOutline />
						</TooltipTrigger>
						<TooltipContent>{tooltip}</TooltipContent>
					</Tooltip>
				)}
			</div>
			{children}
		</div>
	);
};
