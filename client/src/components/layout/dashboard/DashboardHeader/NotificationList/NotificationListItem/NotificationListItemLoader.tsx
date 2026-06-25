import { SkeletonLoader } from '@/components/ui';
import styles from './NotificationListItem.module.scss';

export const NotificationListItemLoader = () => {
	return (
		<div className={styles.item}>
			<SkeletonLoader height={180} width="100%" />
		</div>
	);
};
