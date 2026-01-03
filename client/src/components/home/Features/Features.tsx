import { SectionHeader } from '@/components/ui';
import FeatureItem from './FeatureItem/FeatureItem';
import styles from './Features.module.scss';
import { FEATURES } from './featuresItems';

const Features = () => {
	return (
		<div className={`${styles['features']} container`} id="features">
			<SectionHeader
				title="Features"
				description="Explore the powerful features that make our product stand out."
				titleComponent="h2"
				containerClassName={styles['features__header']}
			/>
			<div className={styles['features__list']}>
				{FEATURES.map((feature) => (
					<FeatureItem key={feature.title} feature={feature} />
				))}
			</div>
		</div>
	);
};

export default Features;
