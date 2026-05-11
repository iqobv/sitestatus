'use client';

import { Button, SectionHeader } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import { FullStatusPage } from '@/types';
import { LuExternalLink } from 'react-icons/lu';
import { StatusPageDropdown } from '../../StatusPageDropdown';
import styles from './StatusPageDetailsHeader.module.scss';

interface StatusPageDetailsHeaderProps {
	data: FullStatusPage;
}

const StatusPageDetailsHeader = ({ data }: StatusPageDetailsHeaderProps) => {
	return (
		<div className={styles.header}>
			<SectionHeader
				title={
					<>
						{data.title}
						{!data.isPublished && ' (Draft)'}
					</>
				}
				description={data.description}
			/>
			<div className={styles.actions}>
				<Button
					variant="outlined"
					isIcon
					size="sm"
					href={PUBLIC_PAGES.STATUS_PAGE(data.slug)}
					target="_blank"
					rel="noopener noreferrer"
				>
					<LuExternalLink size={20} />
				</Button>
				<StatusPageDropdown
					statusPage={data}
					showEdit={false}
					redirectOnDelete
					refetchByIdOnSuccess
				/>
			</div>
		</div>
	);
};

export default StatusPageDetailsHeader;
