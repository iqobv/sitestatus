import { SectionHeader } from '@/components/ui';
import { FeatureItem } from './FeatureItem/FeatureItem';
import styles from './Features.module.scss';
import { FEATURES } from './featuresItems';

export const Features = () => {
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
					titleProps={{
						variant: 'h2',
						className: styles.title,
					}}
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
