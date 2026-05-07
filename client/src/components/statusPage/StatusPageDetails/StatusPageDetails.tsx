'use client';

import { getStatusPageById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import styles from './StatusPageDetails.module.scss';
import StatusPageDetailsForm from './StatusPageDetailsForm/StatusPageDetailsForm';
import StatusPageDetailsHeader from './StatusPageDetailsHeader/StatusPageDetailsHeader';
import StatusPageDetailsLoader from './StatusPageDetailsLoader';

const StatusPageDetails = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, error } = useQuery({
		queryKey: QUERY_KEYS.statusPage.byId(id),
		queryFn: () => getStatusPageById(id),
		enabled: !!id,
	});

	if (isLoading) return <StatusPageDetailsLoader />;
	if (error || !data) return notFound();

	return (
		<div className={styles.details}>
			<StatusPageDetailsHeader data={data} />
			<StatusPageDetailsForm data={data} />
		</div>
	);
};

export default StatusPageDetails;
