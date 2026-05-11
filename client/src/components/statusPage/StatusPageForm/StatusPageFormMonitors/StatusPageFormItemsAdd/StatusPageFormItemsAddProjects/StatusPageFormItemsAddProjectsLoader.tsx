import { SkeletonLoader } from '@/components/ui';
import styles from '../StatusPageFormItemsAdd.module.scss';

const items = Array.from({ length: 5 }).map((_, i) => (
	<div
		key={i}
		className={styles.item}
		style={{ width: '100%', display: 'block' }}
	>
		<SkeletonLoader key={i} width="100%" height={44} />
	</div>
));

const StatusPageFormItemsAddProjectsLoader = () => {
	return <div className={styles.list}>{items}</div>;
};

export default StatusPageFormItemsAddProjectsLoader;
