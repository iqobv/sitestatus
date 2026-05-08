'use client';

import { updateStatusPage } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateStatusPageDto } from '@/dto';
import { updateStatusPageSchema } from '@/schemas';
import { FullStatusPage } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import StatusPageForm, {
	StatusPageFormDto,
} from '../../StatusPageForm/StatusPageForm';
import styles from './StatusPageDetailsUpdate.module.scss';
import { UPDATE_STATUS_PAGE_FORM_FIELDS } from './statusPageFormFields';

interface StatusPageDetailsUpdateProps {
	data: FullStatusPage;
}

const StatusPageDetailsUpdate = ({ data }: StatusPageDetailsUpdateProps) => {
	const { id } = useParams<{ id: string }>();

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (data: UpdateStatusPageDto) => updateStatusPage(id, data),
		onSuccess: (data) => {
			queryClient.setQueryData(QUERY_KEYS.statusPage.byId(id), data);

			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.statusPage.byId(id),
			});

			toast.success('Status page updated successfully');
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to update status page');
		},
	});

	return (
		<div className={styles.statusPageDetailsUpdate}>
			<StatusPageForm<StatusPageFormDto>
				schema={updateStatusPageSchema}
				defaultValues={{
					title: '',
					description: '',
					slug: '',
					monitors: [],
					isPublished: false,
					isAutoSync: true,
				}}
				fields={UPDATE_STATUS_PAGE_FORM_FIELDS}
				values={{
					title: data.title,
					description: data.description,
					slug: data.slug,
					monitors: data.monitors.map((m) => ({
						id: m.monitorId,
						displayName: m.displayName,
						sortOrder: m.sortOrder,
						initMonitorName: m.monitor.name,
					})),
					isPublished: data.isPublished,
					isAutoSync: false,
				}}
				onSubmit={(data) => {
					let finalData: UpdateStatusPageDto = data;

					if (data.monitors) {
						finalData = {
							...data,
							monitors: data.monitors.map((m, index) => ({
								id: m.id,
								displayName: m.displayName?.trim() ? m.displayName : null,
								sortOrder: index,
							})),
						};
					}

					mutate(finalData);
				}}
			/>
		</div>
	);
};

export default StatusPageDetailsUpdate;
