'use client';

import { getMonitorById, updateMonitor } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateMonitorDto } from '@/dto';
import { useAuth } from '@/hooks';
import { updateMonitorSchema } from '@/schemas';
import { Monitor } from '@/types';
import { useQuery } from '@tanstack/react-query';
import MonitorForm from '../MonitorForm/MonitorForm';
import { UPDATE_MONITOR_FIELDS } from './updateMonitorFields';

interface UpdateMonitorProps {
	monitorId: string;
}

const UpdateMonitor = ({ monitorId }: UpdateMonitorProps) => {
	const { user } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.byId(monitorId),
		queryFn: () => getMonitorById(monitorId),
		enabled: !!monitorId && !!user,
	});

	return (
		<div>
			{isLoading && <p>Loading monitor data...</p>}
			{!isLoading && data && (
				<MonitorForm<UpdateMonitorDto, Monitor>
					fields={UPDATE_MONITOR_FIELDS}
					mutationFn={(data) => updateMonitor(monitorId, data)}
					buttonLabel="Update Monitor"
					schema={updateMonitorSchema}
					defaultValues={{
						name: data.name,
						url: data.url,
						checkIntervalSeconds: data.checkIntervalSeconds,
						isActive: data.isActive,
					}}
				/>
			)}
		</div>
	);
};

export default UpdateMonitor;
