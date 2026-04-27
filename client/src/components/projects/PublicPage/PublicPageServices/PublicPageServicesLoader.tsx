import { SkeletonLoader } from '@/components/ui';
import styles from './PublicPageServices.module.scss';

const items = Array.from({ length: 4 }).map((_, i) => (
	<SkeletonLoader key={i} height={88} />
));

const PublicPageServicesLoader = () => {
	return <div className={styles.services}>{items}</div>;
};

export default PublicPageServicesLoader;
