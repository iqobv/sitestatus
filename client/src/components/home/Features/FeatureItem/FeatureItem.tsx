import type { FeatureItem as FeatureItemType } from '../featuresItems';
import styles from './FeatureItem.module.scss';

interface FeatureItemProps {
	feature: FeatureItemType;
}

const FeatureItem = ({ feature }: FeatureItemProps) => {
	return (
		<div key={feature.title} className={styles['feature-item']}>
			<div className={styles['feature-item__icon']}>
				<feature.icon size={48} />
			</div>
			<div className={styles['feature-item__content']}>
				<h3 className={styles['feature-item__title']}>{feature.title}</h3>
				<p className={styles['feature-item__description']}>
					{feature.description}
				</p>
			</div>
		</div>
	);
};

export default FeatureItem;
