import type { FeatureItem as FeatureItemType } from '../featuresItems';
import styles from './FeatureItem.module.scss';

interface FeatureItemProps {
	feature: FeatureItemType;
}

const FeatureItem = ({ feature }: FeatureItemProps) => {
	return (
		<div key={feature.title} className={styles.feature}>
			<feature.icon size={30} color="var(--features-card-icon-color)" />
			<div className={styles.content}>
				<h3 className={styles.title}>{feature.title}</h3>
				<p className={styles.description}>{feature.description}</p>
			</div>
		</div>
	);
};

export default FeatureItem;
