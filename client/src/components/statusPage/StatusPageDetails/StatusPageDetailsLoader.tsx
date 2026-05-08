import styles from './StatusPageDetails.module.scss';
import StatusPageDetailsHeaderLoader from './StatusPageDetailsHeader/StatusPageDetailsHeaderLoader';
import StatusPageDetailsUpdateLoader from './StatusPageDetailsUpdate/StatusPageDetailsUpdateLoader';

const StatusPageDetailsLoader = () => {
	return (
		<div className={styles.details}>
			<StatusPageDetailsHeaderLoader />
			<StatusPageDetailsUpdateLoader />
		</div>
	);
};

export default StatusPageDetailsLoader;
