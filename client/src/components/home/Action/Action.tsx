import { Button, SectionHeader } from '@/components/ui';
import { AUTH_PAGES } from '@/config';
import styles from './Action.module.scss';

const Action = () => {
	return (
		<div className={styles.action}>
			<SectionHeader
				title="Your Global Network, Monitored"
				description="Deploy your first monitor in under 60 seconds. Join the global ledger of reliable infrastructure."
				titleComponent="h3"
				titleClassName={styles.title}
				descriptionClassName={styles.description}
			/>
			<Button href={AUTH_PAGES.SIGN_UP}>CREATE FREE ACCOUNT</Button>
		</div>
	);
};

export default Action;
