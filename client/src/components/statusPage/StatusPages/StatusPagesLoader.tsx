import styles from './StatusPages.module.scss';
import StatusPagesHeaderLoader from './StatusPagesHeader/StatusPagesHeaderLoader';

const StatusPagesLoader = () => {
	return (
		<div className={styles.statusPages}>
			<StatusPagesHeaderLoader />
		</div>
	);
};

export default StatusPagesLoader;
