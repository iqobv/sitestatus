'use client';

import { Button } from '@/components/ui';
import { Session } from '@/types';
import { capitalize } from '@/utils';
import styles from './SessionCard.module.scss';
import SessionDevice from './SessionDevice';
import { useTerminateMutations } from './useTerminateMutataions.hook';

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
	const { terminateAllOtherSessionsMutation, terminateSessionMutation } =
		useTerminateMutations();

	const { device, os, browser, city, country } = session;

	const deviceLabel = [device && capitalize(device), os, browser]
		.filter(Boolean)
		.join(', ');
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
				<Button
					variant="outlined"
					fullWidth
					className={styles.terminateButton}
					onClick={() => terminateSessionMutation.mutate(session.id)}
					disabled={terminateSessionMutation.isPending}
				>
					Terminate
				</Button>
			)}
			{isCurrentSession && showTerminateAllButton && (
				<Button
					variant="outlined"
					fullWidth
					className={styles.terminateButton}
					onClick={() => terminateAllOtherSessionsMutation.mutate()}
					disabled={terminateAllOtherSessionsMutation.isPending}
				>
					Terminate All Other Sessions
				</Button>
			)}
		</div>
	);
};

export default SessionCard;
