'use client';

import { getProjectBySlug } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import styles from './PublicPage.module.scss';
import PublicPageHeader from './PublicPageHeader/PublicPageHeader';
import PublicPageLoader from './PublicPageLoader';
import PublicPageServices from './PublicPageServices/PublicPageServices';

interface PublicPageProps {}

const PublicPage = ({}: PublicPageProps) => {
	const { slug } = useParams<{ slug: string }>();

	const { data, isLoading, error } = useQuery({
		queryKey: QUERY_KEYS.project.bySlug(slug),
		queryFn: () => getProjectBySlug(slug),
		enabled: !!slug,
	});

	if (error) return notFound();
	if (isLoading) return <PublicPageLoader />;
	if (!data) return notFound();

	return (
		<div className={styles.publicPage}>
			<PublicPageHeader data={data} />
			<PublicPageServices data={data} />
		</div>
	);
};

export default PublicPage;
