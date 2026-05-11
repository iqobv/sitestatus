import { SkeletonLoader } from '@/components/ui';
import StatusPageFormMonitorsLoader from './StatusPageFormMonitors/StatusPageFormMonitorsLoader';

interface StatusPageFormLoaderProps {
	count?: number;
}

const StatusPageFormLoader = ({ count = 3 }: StatusPageFormLoaderProps) => {
	return (
		<div>
			<SkeletonLoader height={44} width={150} />
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} style={{ margin: '16px 0' }}>
					<SkeletonLoader height={80} width="100%" />
				</div>
			))}
			<StatusPageFormMonitorsLoader />
		</div>
	);
};

export default StatusPageFormLoader;
