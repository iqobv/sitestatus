'use client';

import { updateStatusPage } from '@/api';
import { DropdownItem } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { StatusPage } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MdPublic } from 'react-icons/md';
import { toast } from 'react-toastify';
import { iconProps } from './StatusPageDropdown';

interface StatusPageDropdownPublishProps {
	data: StatusPage;
	refetchByIdOnSuccess?: boolean;
}

export const StatusPageDropdownPublish = ({
	data,
	refetchByIdOnSuccess,
}: StatusPageDropdownPublishProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () =>
			updateStatusPage(data.id, { isPublished: !data.isPublished }),
		onSuccess: (result) => {
			if (result.isPublished) {
				toast.success('Status page published successfully');
			} else if (!result.isPublished) {
				toast.success('Status page unpublished successfully');
			}

			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.statusPages.lists(),
			});
			if (refetchByIdOnSuccess) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.statusPages.detail(data.id),
				});
			}
		},
		onError: (e) => {
			toast.error(
				e.message || 'An error occurred while updating the status page',
			);
		},
	});

	return (
		<DropdownItem onClick={() => mutate()}>
			<MdPublic {...iconProps} />
			{data.isPublished ? 'Unpublish' : 'Publish'}
		</DropdownItem>
	);
};
