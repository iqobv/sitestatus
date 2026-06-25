import styles from './StatusPages.module.scss';
import { StatusPagesHeaderLoader } from './StatusPagesHeader/StatusPagesHeaderLoader';

export const StatusPagesLoader = () => {
	return (
		<div className={styles.statusPages}>
			<StatusPagesHeaderLoader />
		</div>
	);
};
