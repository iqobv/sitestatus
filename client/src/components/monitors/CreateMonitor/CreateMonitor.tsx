'use client';

import { createMonitor } from '@/api';
import { PRIVATE_PAGES } from '@/config';
import { CreateMonitorDto } from '@/dto';
import { createMonitorSchema } from '@/schemas';
import { Monitor } from '@/types';
import { useRouter } from 'next/navigation';
import MonitorForm from '../MonitorForm/MonitorForm';
import { CREATE_MONITOR_FIELDS } from './createMonitorFields';

const CreateMonitor = () => {
	const router = useRouter();

	return (
		<MonitorForm<CreateMonitorDto, Monitor>
			fields={CREATE_MONITOR_FIELDS}
			mutationFn={createMonitor}
			onSuccess={(data) => {
				router.push(PRIVATE_PAGES.MONITOR(data.id));
			}}
			onCancel={() => router.back()}
			schema={createMonitorSchema}
			buttonLabel="Create Monitor"
			defaultValues={{
				name: '',
				checkIntervalSeconds: 300,
				url: '',
			}}
		/>
	);
};

export default CreateMonitor;
