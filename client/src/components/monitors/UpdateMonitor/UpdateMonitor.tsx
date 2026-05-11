'use client';

import { getMonitorById, updateMonitor } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateMonitorDto } from '@/dto';
import { updateMonitorSchema } from '@/schemas';
import { MonitorWithRegionsIds } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import MonitorForm from '../MonitorForm/MonitorForm';
import { UPDATE_MONITOR_FIELDS } from './updateMonitorFields';
import UpdateMonitorLoader from './UpdateMonitorLoader';

interface UpdateMonitorProps {
	monitorId: string;
}

const UpdateMonitor = ({ monitorId }: UpdateMonitorProps) => {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.byId(monitorId),
		queryFn: () => getMonitorById(monitorId),
		enabled: !!monitorId,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpdateMonitorDto) => updateMonitor(monitorId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.monitors.byId(monitorId),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.monitors.list,
			});
			toast.success('Monitor updated successfully');
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to update monitor. Please try again.');
		},
	});

	return (
		<div>
			{isLoading && <UpdateMonitorLoader />}
			{!isLoading && data && (
				<MonitorForm<UpdateMonitorDto, MonitorWithRegionsIds>
					fields={UPDATE_MONITOR_FIELDS}
					isLoading={isPending}
					onSubmit={(data) => mutate(data)}
					buttonLabel="Update Monitor"
					schema={updateMonitorSchema}
					defaultValues={{
						name: '',
						url: '',
						checkIntervalSeconds: 300,
						regions: [],
						projectId: '',
					}}
					values={{
						name: data.name,
						url: data.url,
						checkIntervalSeconds: data.checkIntervalSeconds,
						regions: data.regions,
						projectId: data.projectId || '',
					}}
				/>
			)}
		</div>
	);
};

export default UpdateMonitor;
