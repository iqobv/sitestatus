'use client';

import { getMonitorById, updateMonitor } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateMonitorDto } from '@/dto';
import { updateMonitorSchema } from '@/schemas';
import { MonitorWithRegionsIds } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import MonitorForm from '../MonitorForm/MonitorForm';
import { UPDATE_MONITOR_FIELDS } from './updateMonitorFields';
import UpdateMonitorLoader from './UpdateMonitorLoader';

interface UpdateMonitorProps {
	monitorId: string;
}

const UpdateMonitor = ({ monitorId }: UpdateMonitorProps) => {
	const router = useRouter();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.byId(monitorId),
		queryFn: () => getMonitorById(monitorId),
		enabled: !!monitorId,
	});

	return (
		<div>
			{isLoading && <UpdateMonitorLoader />}
			{!isLoading && data && (
				<MonitorForm<UpdateMonitorDto, MonitorWithRegionsIds>
					fields={UPDATE_MONITOR_FIELDS}
					mutationFn={(data) => updateMonitor(monitorId, data)}
					buttonLabel="Update Monitor"
					onCancel={() => router.back()}
					schema={updateMonitorSchema}
					defaultValues={{
						name: data.name,
						url: data.url,
						checkIntervalSeconds: data.checkIntervalSeconds,
						regions: data.regions || [],
						projectId: data.projectId || '',
					}}
				/>
			)}
		</div>
	);
};

export default UpdateMonitor;
