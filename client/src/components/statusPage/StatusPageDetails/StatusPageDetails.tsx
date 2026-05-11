'use client';

import { getStatusPageById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import StatusPageDetailsHeader from './StatusPageDetailsHeader/StatusPageDetailsHeader';
import StatusPageDetailsLoader from './StatusPageDetailsLoader';
import StatusPageDetailsUpdate from './StatusPageDetailsUpdate/StatusPageDetailsUpdate';

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
		<div>
			<StatusPageDetailsHeader data={data} />
			<StatusPageDetailsUpdate data={data} />
		</div>
	);
};

export default StatusPageDetails;
