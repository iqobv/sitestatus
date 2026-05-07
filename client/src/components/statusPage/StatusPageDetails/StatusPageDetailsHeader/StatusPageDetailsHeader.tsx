'use client';

import { SectionHeader } from '@/components/ui';
import { FullStatusPage } from '@/types';
import styles from './StatusPageDetailsHeader.module.scss';

interface StatusPageDetailsHeaderProps {
	data: FullStatusPage;
}

const StatusPageDetailsHeader = ({ data }: StatusPageDetailsHeaderProps) => {
	return (
		<div className={styles.header}>
			<SectionHeader title={data.title} description={data.description} />
		</div>
	);
};

export default StatusPageDetailsHeader;
