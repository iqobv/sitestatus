import { SkeletonLoader } from '@/components/ui';
import SettingsCardLoader from '../SettingsCard/SettingsCardLoader';
import SettingsWrapperLoader from '../SettingsWrapper/SettingsWrapperLoader';

const SessionsLoader = () => {
	return (
		<SettingsWrapperLoader count={0}>
			<SkeletonLoader width={150} height={20} style={{ margin: '20px 0' }} />
			<SettingsCardLoader />
			<SkeletonLoader width={150} height={20} style={{ margin: '20px 0' }} />
			<SettingsCardLoader />
		</SettingsWrapperLoader>
	);
};

export default SessionsLoader;
