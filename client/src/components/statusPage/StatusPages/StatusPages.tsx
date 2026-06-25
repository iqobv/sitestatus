import styles from './StatusPages.module.scss';
import { StatusPagesHeader } from './StatusPagesHeader/StatusPagesHeader';
import { StatusPagesTable } from './StatusPagesTable/StatusPagesTable';

export const StatusPages = () => {
	return (
		<div className={styles.statusPages}>
			<StatusPagesHeader />
			<StatusPagesTable />
		</div>
	);
};
