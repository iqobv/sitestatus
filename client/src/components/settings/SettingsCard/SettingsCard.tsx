'use client';

import styles from './SettingsCard.module.scss';
import { SettingsCardProps } from './SettingsCard.types';

const SettingsCard = ({
	title,
	description,
	action,
	className,
	desktopDirection = 'row',
}: SettingsCardProps) => {
	return (
		<div
			className={`${styles.card} ${className || ''}`}
			style={{ '--desktop-direction': desktopDirection } as React.CSSProperties}
		>
			<div>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div>{action}</div>
		</div>
	);
};

export default SettingsCard;
