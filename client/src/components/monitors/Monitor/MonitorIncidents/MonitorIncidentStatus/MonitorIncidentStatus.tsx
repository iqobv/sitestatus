'use client';

import React from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';
import styles from './MonitorIncidentStatus.module.scss';

interface MonitorIncidentStatusProps {
	isResolved: boolean;
	showText?: boolean;
}

export const MonitorIncidentStatus = ({
	isResolved,
	showText = true,
}: MonitorIncidentStatusProps) => {
	return (
		<div
			className={styles.status}
			style={
				{
					'--status-color': `var(--incident-${isResolved ? 'resolved' : 'open'})`,
				} as React.CSSProperties
			}
		>
			{isResolved ? (
				<>
					<MdCheckCircle /> {showText && <span>Resolved</span>}
				</>
			) : (
				<>
					<MdError /> {showText && <span>Open</span>}
				</>
			)}
		</div>
	);
};
