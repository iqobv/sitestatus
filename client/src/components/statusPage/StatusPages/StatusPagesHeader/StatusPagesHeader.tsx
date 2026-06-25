import { IconButton, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { FiPlus } from 'react-icons/fi';

export const StatusPagesHeader = () => {
	return (
		<SectionHeader
			title="Status Pages"
			rightSlot={
				<IconButton Icon={FiPlus} href={PRIVATE_PAGES.STATUS_PAGES.NEW}>
					Add New Status Page
				</IconButton>
			}
		/>
	);
};
