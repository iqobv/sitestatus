'use client';

import { deleteMonitor } from '@/api/monitor/deleteMonitor.api';
import { Button, ConfirmAction, DropdownItem } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdOutlineDelete } from 'react-icons/md';
import { useMonitorDropdownItemMutation } from './useMonitorDropdownItemMutation.hook';

interface MonitorDeleteModalProps {
	id: string;
	name: string;
}

export const MonitorDeleteModal = ({ id, name }: MonitorDeleteModalProps) => {
	const queryClient = new QueryClient();
	const router = useRouter();

	const { mutate } = useMonitorDropdownItemMutation({
		monitorId: id,
		mutationFn: deleteMonitor,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.monitors.lists() });
			router.push(PRIVATE_PAGES.MONITORS.ALL);
		},
	});

	return (
		<ConfirmAction
			trigger={
				<DropdownItem asChild onSelect={(e) => e.preventDefault()}>
					<Button variant="outlined" color="danger">
						<MdOutlineDelete size={20} />
						Delete
					</Button>
				</DropdownItem>
			}
			title="Delete Monitor"
			description="Are you sure you want to delete this monitor? This action cannot be undone."
			onConfirm={() => mutate()}
			confirmWithInput
			exceptedInputValue={name}
			inputLabel={
				<>
					Type the "<strong style={{ userSelect: 'all' }}>{name}</strong>" to
					confirm.
				</>
			}
		/>
	);
};
