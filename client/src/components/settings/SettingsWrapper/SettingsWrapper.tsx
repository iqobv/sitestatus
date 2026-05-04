import { SectionHeader } from '@/components/ui';
import styles from './SettingsWrapper.module.scss';

interface SettingsWrapperProps {
	children: React.ReactNode;
	title: React.ReactNode;
}

const SettingsWrapper = ({ children, title }: SettingsWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			<SectionHeader title={title} titleComponent="h2" padding={0} />
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default SettingsWrapper;
