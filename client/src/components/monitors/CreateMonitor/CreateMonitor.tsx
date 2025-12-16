'use client';

import { createMonitor } from '@/api';
import { PAGES } from '@/config';
import { CreateMonitorDto } from '@/dto';
import { createMonitorSchema } from '@/schemas';
import { IMonitor } from '@/types';
import { useRouter } from 'next/navigation';
import MonitorForm from '../MonitorForm/MonitorForm';
import { CREATE_MONITOR_FIELDS } from './createMonitorFields';

const CreateMonitor = () => {
	const router = useRouter();

	return (
		<MonitorForm<CreateMonitorDto, IMonitor>
			fields={CREATE_MONITOR_FIELDS}
			mutationFn={createMonitor}
			onSuccess={(data) => {
				router.push(PAGES.MONITOR(data.id));
			}}
			schema={createMonitorSchema}
			buttonLabel="Create Monitor"
			defaultValues={{
				name: '',
				checkIntervalSeconds: 5,
				url: '',
			}}
		/>
	);
};

export default CreateMonitor;
