import { TableLoader } from '@/components/ui';
import { STATUS_PAGES_COLUMNS } from './statusPagesColumns';

export const StatusPagesTableLoader = () => {
	return <TableLoader columns={STATUS_PAGES_COLUMNS} countRows={10} />;
};
