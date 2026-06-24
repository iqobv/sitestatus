import { Button, SectionHeader } from '@/components/ui';
import { AUTH_PAGES } from '@/config/authPages.config';
import styles from './Action.module.scss';

export const Action = () => {
	return (
		<div className={styles.action}>
			<SectionHeader
				title="Your Global Network, Monitored"
				description="Deploy your first monitor in under 60 seconds. Join the global ledger of reliable infrastructure."
				titleProps={{
					variant: 'h3',
				}}
			/>
			<Button href={AUTH_PAGES.REGISTER}>CREATE FREE ACCOUNT</Button>
		</div>
	);
};
