'use client';

import { createMonitor } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { CreateMonitorDto } from '@/dto';
import { createMonitorSchema } from '@/schemas';
import { BaseMonitor } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { toast } from 'react-toastify';
import MonitorForm from '../MonitorForm/MonitorForm';
import { CREATE_MONITOR_FIELDS } from './createMonitorFields';

const CreateMonitor = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [projectId] = useQueryState('projectId');

	const { mutate, isPending } = useMutation({
		mutationFn: (data: CreateMonitorDto) => createMonitor(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.monitors.list,
			});
			router.push(PRIVATE_PAGES.MONITORS.ONE(data.id));
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to create monitor. Please try again.');
		},
	});

	return (
		<MonitorForm<CreateMonitorDto, BaseMonitor>
			fields={CREATE_MONITOR_FIELDS}
			schema={createMonitorSchema}
			buttonLabel="Create Monitor"
			defaultValues={{
				name: '',
				checkIntervalSeconds: 300,
				url: '',
				projectId: projectId || '',
				regions: [],
			}}
			isLoading={isPending}
			onSubmit={(data) => mutate(data)}
		/>
	);
};

export default CreateMonitor;
