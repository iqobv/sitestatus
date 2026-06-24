import {
	IconButtonLoader,
	SectionHeader,
	SkeletonLoader,
} from '@/components/ui';
import styles from './ProjectHeader.module.scss';

export const ProjectHeaderLoader = () => {
	return (
		<SectionHeader
			title={<SkeletonLoader width={160} height={48} />}
			description={<SkeletonLoader width={160} height={24} />}
			rightSlot={
				<div className={styles.headerActions}>
					<IconButtonLoader width={200} />
					<IconButtonLoader withText={false} />
				</div>
			}
		/>
	);
};
