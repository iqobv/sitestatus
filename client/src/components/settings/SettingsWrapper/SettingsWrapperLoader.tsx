import { SkeletonLoader } from '@/components/ui';
import styles from './SettingsWrapper.module.scss';

interface SettingsWrapperLoaderProps {
	count?: number;
	children?: React.ReactNode;
}

const SettingsListLoader = ({ count = 4 }: SettingsWrapperLoaderProps) => {
	return [...Array(count)].map((_, i) => (
		<SkeletonLoader key={i} height={140} width={'100%'} />
	));
};

const SettingsWrapperLoader = ({
	count,
	children,
}: SettingsWrapperLoaderProps) => {
	return (
		<div className={styles.wrapper}>
			<SkeletonLoader height={28} width={180} />
			<div className={styles.content}>
				<SettingsListLoader count={count} />
				{children}
			</div>
		</div>
	);
};

export default SettingsWrapperLoader;
