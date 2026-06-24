import { LogoLink } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import styles from './LegalHeader.module.scss';

export const LegalHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<LogoLink href={PUBLIC_PAGES.HOME} />
			</div>
		</header>
	);
};
