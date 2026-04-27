'use client';

import { SectionHeader } from '@/components/ui';
import { PublicProjectPage } from '@/types';
import styles from './PublicPageHeader.module.scss';

interface PublicPageHeaderProps {
	data: PublicProjectPage;
}

const PublicPageHeader = ({ data }: PublicPageHeaderProps) => {
	return (
		<div className={styles.publicPageHeader}>
			<SectionHeader title={data.name} padding={0} />
		</div>
	);
};

export default PublicPageHeader;
