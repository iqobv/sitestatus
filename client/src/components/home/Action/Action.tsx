import { Button, SectionHeader } from '@/components/ui';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
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
				textAlign="center"
			/>
			<Button href={CROSS_DOMAIN_ROUTES.APP_REGISTER} asNative>
				CREATE FREE ACCOUNT
			</Button>
		</div>
	);
};
