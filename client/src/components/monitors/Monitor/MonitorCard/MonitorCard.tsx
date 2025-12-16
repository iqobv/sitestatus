'use client';

import { Tooltip } from '@/components/ui';
import { useRef, useState } from 'react';
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
	const iconRef = useRef<HTMLDivElement>(null);
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	const handleMouseEnter = () => setIsTooltipVisible(true);
	const handleMouseLeave = () => setIsTooltipVisible(false);

	return (
		<div className={`card ${className || ''}`}>
			<div className={styles['monitor-card__header']}>
				<p className={`${styles['monitor-card__title']}`}>{cardTitle}</p>
				{tooltip && (
					<>
						<div
							ref={iconRef}
							className={styles['monitor-card__info-icon']}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<MdInfoOutline />
						</div>
						{isTooltipVisible && (
							<Tooltip targetRef={iconRef}>{tooltip}</Tooltip>
						)}
					</>
				)}
			</div>
			{children}
		</div>
	);
};

export default MonitorCard;
