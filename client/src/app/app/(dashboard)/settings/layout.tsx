import { SettingsTabs } from '@/components/layout/settings/SettingsTabs/SettingsTabs';
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
