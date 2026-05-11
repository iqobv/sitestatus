import { SettingsTabs } from '@/components/layout';
import styles from './settingsLayout.module.scss';

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.container}>
			<SettingsTabs />
			{children}
		</div>
	);
}
