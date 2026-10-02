'use client';

import { updateMonitorActiveStatus } from '@/api/monitor/updateMonitor.api';
import { DropdownItem } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { MonitorWithRegions } from '@/types/monitors/monitor.types';
import { useQueryClient } from '@tanstack/react-query';
import { MdPauseCircleOutline, MdPlayCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useMonitorDropdownItemMutation } from './useMonitorDropdownItemMutation.hook';

interface MonitorDropdownUpdateActiveStatusProps {
	monitor: MonitorWithRegions;
}

export const MonitorDropdownUpdateActiveStatus = ({
	monitor,
}: MonitorDropdownUpdateActiveStatusProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMonitorDropdownItemMutation({
		monitorId: monitor.id,
		mutationFn: updateMonitorActiveStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.monitors.detailFull(monitor.id),
			});
			toast.success(
				`Monitor ${monitor.isActive ? 'paused' : 'resumed'} successfully`,
			);
		},
	});

	const handleUpdate = () => mutate();

	return (
		<DropdownItem asChild onClick={handleUpdate}>
			<span>
				{monitor.isActive ? (
					<>
						<MdPauseCircleOutline size={20} /> Pause
					</>
				) : (
					<>
						<MdPlayCircleOutline size={20} /> Resume
					</>
				)}
			</span>
		</DropdownItem>
	);
};
