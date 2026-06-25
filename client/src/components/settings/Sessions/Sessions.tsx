'use client';

import { getAllSessions } from '@/api/session/getAll.api';
import { SectionHeader } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import { SettingsWrapper } from '../SettingsWrapper/SettingsWrapper';
import { SessionCard } from './SessionCard/SessionCard';
import styles from './Sessions.module.scss';
import { SessionsLoader } from './SessionsLoader';

export const Sessions = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.sessions.lists(),
		queryFn: getAllSessions,
	});

	if (isLoading) return <SessionsLoader />;
	if (!data) return null;

	return (
		<SettingsWrapper title="Sessions">
			<div className={styles.sessions}>
				{data && (
					<>
						<div className={styles.currentSession}>
							<SectionHeader
								title="Current Session"
								titleProps={{
									variant: 'h3',
								}}
							/>
							<SessionCard
								session={data.currentSession}
								isCurrentSession
								showTerminateAllButton={data.otherSessions.length > 0}
							/>
						</div>
						{data.otherSessions.length > 0 && (
							<div className={styles.sessions}>
								<SectionHeader
									title="Other Sessions"
									titleProps={{
										variant: 'h3',
									}}
								/>
								{data.otherSessions.map((s) => (
									<SessionCard key={s.id} session={s} />
								))}
							</div>
						)}
					</>
				)}
			</div>
		</SettingsWrapper>
	);
};

export default Sessions;
