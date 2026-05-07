import { IconButton, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { FiPlus } from 'react-icons/fi';
import styles from './StatusPagesHeader.module.scss';

const StatusPagesHeader = () => {
	return (
		<div className={styles.header}>
			<SectionHeader title="Status Pages" />
			<IconButton Icon={FiPlus} href={PRIVATE_PAGES.STATUS_PAGES.NEW}>
				Add New Status Page
			</IconButton>
		</div>
	);
};

export default StatusPagesHeader;
