'use client';

import { createStatusPage } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { CreateStatusPageDto } from '@/dto';
import { createStatusPageSchema } from '@/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { StatusPageForm } from '../StatusPageForm';
import { StatusPageFormDto } from '../StatusPageForm/StatusPageForm';
import { CREATE_STATUS_PAGE_FORM_FIELDS } from './statusPageCreateFields';

const StatusPageCreate = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: (data: CreateStatusPageDto) => createStatusPage(data),
	});

	return (
		<StatusPageForm<StatusPageFormDto>
			schema={createStatusPageSchema}
			defaultValues={{
				title: '',
				description: '',
				slug: '',
				monitors: [],
				isPublished: false,
				isAutoSync: true,
			}}
			fields={CREATE_STATUS_PAGE_FORM_FIELDS}
			onSubmit={(data, _e, methods) => {
				let finalData: CreateStatusPageDto = {
					title: data.title ?? '',
					slug: data.slug ?? '',
					description: data.description ?? null,
					monitors: data.monitors.map((m, index) => ({
						id: m.id,
						displayName: m.displayName?.trim() ? m.displayName : null,
						sortOrder: index,
					})),
				};

				mutate(finalData, {
					onSuccess: (data) => {
						queryClient.invalidateQueries({
							queryKey: QUERY_KEYS.statusPage.all,
						});

						router.push(PRIVATE_PAGES.STATUS_PAGES.ID(data.id));

						toast.success('Status page created successfully');
					},
					onError: (e) => {
						toast.error(e.message || 'Failed to create status page');

						if (isAxiosError(e) && e.response?.data?.field === 'slug') {
							methods.setError('slug', {
								type: 'manual',
								message: e.response.data.message || 'Slug is already in use',
							});
						}
					},
				});
			}}
		/>
	);
};

export default StatusPageCreate;
