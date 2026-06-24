import {
	IconButtonLoader,
	SectionHeader,
	SkeletonLoader,
} from '@/components/ui';
import { MonitorsLoader } from './MonitorsLoader';

export const MonitorsAllLoader = () => {
	return (
		<>
			<SectionHeader
				title={<SkeletonLoader height={48} width={160} />}
				description={<SkeletonLoader width={180} height={24} />}
				rightSlot={<IconButtonLoader width={200} />}
			/>
			<MonitorsLoader />
		</>
	);
};
