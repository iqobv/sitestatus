import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorResponseCards.module.scss';

const cards = Array.from({ length: 3 }, (_, i) => (
	<SkeletonLoader key={i} height={82} />
));

const MonitorResponseCardsLoader = () => {
	return <div className={styles['monitor-response-cards']}>{cards}</div>;
};

export default MonitorResponseCardsLoader;
