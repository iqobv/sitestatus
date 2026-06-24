'use client';

import { updateMonitorActiveStatus } from '@/api';
import { DropdownItem } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { MonitorWithRegions } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { MdPauseCircleOutline, MdPlayCircleOutline } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';
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
		},
	});

	const handleUpdate = () => mutate();

	return (
		<DropdownItem asChild>
			<button onClick={handleUpdate} className={styles.dropdownItem}>
				{monitor.isActive ? (
					<>
						<MdPauseCircleOutline size={20} /> Pause
					</>
				) : (
					<>
						<MdPlayCircleOutline size={20} /> Resume
					</>
				)}
			</button>
		</DropdownItem>
	);
};
