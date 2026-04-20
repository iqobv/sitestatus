import { ProjectHeaderLoader, ProjectLoader } from '@/components/projects';

export default function Loading() {
	return (
		<>
			<ProjectHeaderLoader />
			<ProjectLoader />
		</>
	);
}
