'use client';

import React from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';
import styles from './MonitorIncidentStatus.module.scss';

interface MonitorIncidentStatusProps {
	isResolved: boolean;
}

const MonitorIncidentStatus = ({ isResolved }: MonitorIncidentStatusProps) => {
	return (
		<div
			className={styles['monitor-incident-status']}
			style={
				{
					'--status-color': `var(--accident-${isResolved ? 'resolved' : 'open'})`,
				} as React.CSSProperties
			}
		>
			{isResolved ? (
				<>
					<MdCheckCircle /> <span>Resolved</span>
				</>
			) : (
				<>
					<MdError /> <span>Open</span>
				</>
			)}
		</div>
	);
};

export default MonitorIncidentStatus;
