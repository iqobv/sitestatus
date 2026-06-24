import {
	IconButtonLoader,
	SectionHeader,
	SkeletonLoader,
} from '@/components/ui';
import { ProjectsTableLoader } from './ProjectsTable/ProjectsTableLoader';

export const ProjectsLoader = () => {
	return (
		<>
			<SectionHeader
				title={<SkeletonLoader height="2.875rem" width={160} />}
				titleProps={{
					variant: 'h1',
					as: 'div',
				}}
				description={<SkeletonLoader height="1.75rem" width={180} />}
				rightSlot={<IconButtonLoader width={178} />}
			/>
			<ProjectsTableLoader />
		</>
	);
};
