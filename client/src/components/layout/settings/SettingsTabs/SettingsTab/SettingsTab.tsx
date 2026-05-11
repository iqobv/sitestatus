'use client';

import Link from 'next/link';
import { SettingsTabsItem } from '../settingsTabsItems';
import styles from './SettingsTab.module.scss';

interface SettingsTabProps {
	item: SettingsTabsItem;
	isActive: boolean;
}

const SettingsTab = ({ item, isActive }: SettingsTabProps) => {
	return (
		<Link
			className={`${styles.tab} ${isActive ? styles.active : ''}`}
			href={item.href}
		>
			{item.label}
		</Link>
	);
};

export default SettingsTab;
