'use client';

import { createMonitor } from '@/api';
import { PRIVATE_PAGES } from '@/config';
import { CreateMonitorDto } from '@/dto';
import { createMonitorSchema } from '@/schemas';
import { BaseMonitor } from '@/types';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import MonitorForm from '../MonitorForm/MonitorForm';
import { CREATE_MONITOR_FIELDS } from './createMonitorFields';

const CreateMonitor = () => {
	const router = useRouter();
	const [projectId] = useQueryState('projectId');

	return (
		<MonitorForm<CreateMonitorDto, BaseMonitor>
			fields={CREATE_MONITOR_FIELDS}
			mutationFn={createMonitor}
			onSuccess={(data) => {
				router.push(PRIVATE_PAGES.MONITORS.ONE(data.id));
			}}
			onCancel={() => router.back()}
			schema={createMonitorSchema}
			buttonLabel="Create Monitor"
			defaultValues={{
				name: '',
				checkIntervalSeconds: 300,
				url: '',
				projectId: projectId || '',
				regions: [],
			}}
		/>
	);
};

export default CreateMonitor;
