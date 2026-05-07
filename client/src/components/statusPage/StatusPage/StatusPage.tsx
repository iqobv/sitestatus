'use client';

import { useParams } from 'next/navigation';
import styles from './StatusPage.module.scss';
import StatusPageHeader from './StatusPageHeader/StatusPageHeader';
import StatusPageMonitors from './StatusPageMonitors/StatusPageMonitors';

const StatusPage = () => {
	const { slug } = useParams<{ slug: string }>();

	return (
		<div className={styles.statusPage}>
			<StatusPageHeader slug={slug} />
			<StatusPageMonitors slug={slug} />
		</div>
	);
};

export default StatusPage;
