'use client';

import { deleteStatusPage } from '@/api/statusPage/deleteStatusPage.api';
import { ConfirmAction, DropdownItem } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { iconProps } from './StatusPageDropdown';

interface StatusPageDropdownDeleteProps {
	id: string;
	redirectOnDelete?: boolean;
}

export const StatusPageDropdownDelete = ({
	id,
	redirectOnDelete,
}: StatusPageDropdownDeleteProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => deleteStatusPage(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.statusPages.lists(),
			});
			toast.success(data.message || 'Status page deleted successfully');
			if (redirectOnDelete) {
				router.push(PRIVATE_PAGES.STATUS_PAGES.ALL);
			}
		},
	});

	return (
		<ConfirmAction
			title="Delete Status Page"
			description="Are you sure you want to delete this status page? This action cannot be undone."
			confirmButtonText="Delete"
			trigger={
				<DropdownItem closeOnClick={false} isDelete>
					<MdDelete {...iconProps} /> Delete
				</DropdownItem>
			}
			onConfirm={() => mutate()}
		/>
	);
};
