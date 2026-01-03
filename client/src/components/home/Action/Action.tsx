import { Button, SectionHeader } from '@/components/ui';
import { PAGES } from '@/config';
import styles from './Action.module.scss';

const Action = () => {
	return (
		<div className={styles['action']}>
			<div className={`${styles['action__content']} container`}>
				<SectionHeader
					title="Ready to get started?"
					description="Join us today and take the first step towards seamless uptime monitoring."
					titleComponent="h3"
					containerClassName={styles['action__header']}
				/>
				<Button href={PAGES.SIGN_UP}>Get Started</Button>
			</div>
		</div>
	);
};

export default Action;
