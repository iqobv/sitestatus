'use client';

import { deleteStatusPage } from '@/api';
import { ConfirmAction, Dropdown } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { iconProps } from './StatusPagesTableDropdown';

const StatusPagesTableDropdownDelete = ({ id }: { id: string }) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: () => deleteStatusPage(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.statusPage.all });
			toast.success(data.message || 'Status page deleted successfully');
		},
	});

	return (
		<ConfirmAction
			title="Delete Status Page"
			description="Are you sure you want to delete this status page? This action cannot be undone."
			confirmButtonText="Delete"
			trigger={
				<Dropdown.Item closeOnClick={false} isDelete>
					<MdDelete {...iconProps} /> Delete
				</Dropdown.Item>
			}
			onConfirm={() => mutate()}
		/>
	);
};

export default StatusPagesTableDropdownDelete;
