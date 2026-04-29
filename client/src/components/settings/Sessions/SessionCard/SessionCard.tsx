'use client';

import { Button } from '@/components/ui';
import { Session } from '@/types';
import styles from './SessionCard.module.scss';
import SessionDevice from './SessionDevice';

interface SessionCardProps {
	session: Session;
	isCurrentSession?: boolean;
	showTerminateAllButton?: boolean;
}

const SessionCard = ({
	session,
	isCurrentSession = false,
	showTerminateAllButton = false,
}: SessionCardProps) => {
	const { device, os, browser, city, country } = session;

	const deviceLabel = [device, os, browser].filter(Boolean).join(', ');
	const location = [city, country].filter(Boolean).join(', ');

	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<SessionDevice deviceType={device} />
				<div>
					<p>{deviceLabel}</p>
					<p>{location}</p>
				</div>
			</div>
			{!isCurrentSession && (
				<Button variant="outlined" fullWidth className={styles.terminateButton}>
					Terminate
				</Button>
			)}
			{isCurrentSession && showTerminateAllButton && (
				<Button variant="outlined" fullWidth className={styles.terminateButton}>
					Terminate All Other Sessions
				</Button>
			)}
		</div>
	);
};

export default SessionCard;
