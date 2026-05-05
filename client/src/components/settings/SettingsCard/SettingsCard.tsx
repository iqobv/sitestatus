'use client';

import React from 'react';
import styles from './SettingsCard.module.scss';
import { SettingsCardProps } from './SettingsCard.types';

const SettingsCard = ({
	title,
	description,
	action,
	className,
	desktopDirection = 'row',
	actionJustify = 'flex-start',
}: SettingsCardProps) => {
	return (
		<div
			className={`${styles.card} ${className || ''}`}
			style={
				{
					'--desktop-direction': desktopDirection,
					'--action-justify': actionJustify,
				} as React.CSSProperties
			}
		>
			<div>
				<h3>{title}</h3>
				<div>{description}</div>
			</div>
			<div className={styles.action}>{action}</div>
		</div>
	);
};

export default SettingsCard;
