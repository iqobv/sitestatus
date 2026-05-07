import styles from './StatusPageDetails.module.scss';
import StatusPageDetailsHeaderLoader from './StatusPageDetailsHeader/StatusPageDetailsHeaderLoader';

const StatusPageDetailsLoader = () => {
	return (
		<div className={styles.details}>
			<StatusPageDetailsHeaderLoader />
		</div>
	);
};

export default StatusPageDetailsLoader;
