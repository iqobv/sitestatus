import { SkeletonLoader } from '@/components/ui';
import styles from './ProjectHeader.module.scss';

const ProjectHeaderLoader = () => {
	return (
		<div className={styles.header} style={{ padding: '20px 0' }}>
			<SkeletonLoader height={68} width={170} />
			<div className={styles.headerActions}>
				<SkeletonLoader
					height={46}
					width={200}
					containerClassName={styles.desktopButton}
				/>
				<SkeletonLoader
					height={46}
					width={46}
					containerClassName={styles.mobileButton}
				/>
				<SkeletonLoader height={46} width={46} />
			</div>
		</div>
	);
};

export default ProjectHeaderLoader;
