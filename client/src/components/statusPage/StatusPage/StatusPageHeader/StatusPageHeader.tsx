'use client';

import { getStatusPageBySlug } from '@/api';
import { SectionHeader } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import styles from './StatusPageHeader.module.scss';
import StatusPageHeaderLoader from './StatusPageHeaderLoader';

interface StatusPageHeaderProps {
	slug: string;
}

const StatusPageHeader = ({ slug }: StatusPageHeaderProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: QUERY_KEYS.statusPage.bySlug(slug),
		queryFn: () => getStatusPageBySlug(slug),
		enabled: !!slug,
	});

	if (error) return notFound();
	if (isLoading) return <StatusPageHeaderLoader />;
	if (!data) return notFound();

	return (
		<div className={styles.header}>
			<SectionHeader
				title={data.title}
				description={data.description}
				padding={0}
			/>
		</div>
	);
};

export default StatusPageHeader;
