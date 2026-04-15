import { SectionHeader, SkeletonLoader } from '@/components/ui';
import styles from './MonitorHeader.module.scss';

const MonitorHeaderLoader = () => {
	return (
		<div className={styles['monitor-header']}>
			<SectionHeader
				title={<SkeletonLoader width={250} />}
				description={<SkeletonLoader width={250} />}
			/>
			<SkeletonLoader height={46} width={46} />
		</div>
	);
};

export default MonitorHeaderLoader;
