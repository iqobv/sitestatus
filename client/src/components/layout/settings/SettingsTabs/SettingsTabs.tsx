'use client';

import { usePathname } from 'next/navigation';
import SettingsTab from './SettingsTab/SettingsTab';
import styles from './SettingsTabs.module.scss';
import { SETTINGS_TABS_ITEMS } from './settingsTabsItems';

const SettingsTabs = () => {
	const pathname = usePathname();

	return (
		<nav className={styles.tabs}>
			{SETTINGS_TABS_ITEMS.map((item) => (
				<SettingsTab
					key={item.href}
					item={item}
					isActive={pathname === item.href}
				/>
			))}
		</nav>
	);
};

export default SettingsTabs;
