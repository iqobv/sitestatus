import { SkeletonLoader } from '@/components/ui';
import styles from './StatusPagesHeader.module.scss';

const StatusPagesHeaderLoader = () => {
	return (
		<div className={styles.header}>
			<SkeletonLoader width={150} height={38} style={{ margin: '20px 0' }} />
			<SkeletonLoader width={46} height={46} />
		</div>
	);
};

export default StatusPagesHeaderLoader;
