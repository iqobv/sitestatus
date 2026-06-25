import { Button } from '@/components/ui';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import styles from './Hero.module.scss';

export const Hero = () => {
	return (
		<div className={styles.hero}>
			<div className={`${styles.content} container`}>
				<div className={styles.text}>
					<h1 className={styles.title}>
						<span>Precision</span>
						<span>Infrastructure</span>
						<span>Monitoring</span>
					</h1>
					<p className={styles.description}>
						Global distributed checks, hybrid project grouping, and public
						status pages. Forever free.
					</p>
					<Button href={CROSS_DOMAIN_ROUTES.APP_REGISTER} asNative>
						Start Monitoring Now
					</Button>
				</div>
			</div>
		</div>
	);
};
