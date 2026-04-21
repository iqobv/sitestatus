import { Button } from '@/components/ui';
import { AUTH_PAGES } from '@/config';
import styles from './Hero.module.scss';

const Hero = () => {
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
					<Button href={AUTH_PAGES.SIGN_UP}>Start Monitoring Now</Button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
