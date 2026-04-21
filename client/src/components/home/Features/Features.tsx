import { SectionHeader } from '@/components/ui';
import FeatureItem from './FeatureItem/FeatureItem';
import styles from './Features.module.scss';
import { FEATURES } from './featuresItems';

const Features = () => {
	return (
		<div className={styles.wrapper} id="features">
			<div className={`${styles.features} container`}>
				<SectionHeader
					title={
						<>
							<span>Professional Utility,</span>
							<span>Built for Developers</span>
						</>
					}
					titleClassName={styles.title}
					titleComponent="h2"
				/>
				<div className={styles.list}>
					{FEATURES.map((feature) => (
						<FeatureItem key={feature.title} feature={feature} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Features;
