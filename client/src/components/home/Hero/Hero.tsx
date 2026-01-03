import { Button } from '@/components/ui';
import { PAGES } from '@/config';
import styles from './Hero.module.scss';

const Hero = () => {
	return (
		<div className={styles['hero']}>
			<div className={`${styles['hero__content']} container`}>
				<div className={styles['hero__text']}>
					<h1 className={styles['hero__title']}>
						<span className={styles['hero__highlight']}>Downtime happens.</span>
						<br /> Know about it first.
					</h1>
					<p className={styles['hero__description']}>
						Stay informed with real-time updates on service outages and
						maintenance. Our service ensures you&apos;re always in the loop,
						minimizing disruptions to your workflow.
					</p>
					<Button href={PAGES.SIGN_UP}>Get Started</Button>
				</div>
				<div className={styles['hero__image']}>
					<picture>
						<source media="(min-width: 768px)" srcSet="/hero-image-light.jpg" />
						<source
							media="(min-width: 576px)"
							srcSet="/hero-image-sm-light.jpg"
						/>
						<img
							src="/hero-image-sm-light.jpg"
							alt="Hero image"
							loading="eager"
							className={styles['hero__img']}
						/>
					</picture>
				</div>
			</div>
		</div>
	);
};

export default Hero;
