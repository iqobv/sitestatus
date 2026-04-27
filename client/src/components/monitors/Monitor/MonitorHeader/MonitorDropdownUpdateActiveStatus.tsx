'use client';

import { updateMonitorActiveStatus } from '@/api';
import { Dropdown } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { MonitorWithRegions } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { MdPauseCircleOutline, MdPlayCircleOutline } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';
import { useMonitorDropdownItemMutation } from './useMonitorDropdownItemMutation.hook';

interface MonitorDropdownUpdateActiveStatusProps {
	monitor: MonitorWithRegions;
}

const MonitorDropdownUpdateActiveStatus = ({
	monitor,
}: MonitorDropdownUpdateActiveStatusProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMonitorDropdownItemMutation({
		monitorId: monitor.id,
		mutationFn: updateMonitorActiveStatus,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.monitors.byIdFull(monitor.id),
			});
		},
	});

	const handleUpdate = () => mutate();

	return (
		<Dropdown.Item asChild>
			<button onClick={handleUpdate} className={styles.dropdownItem}>
				{monitor.isActive ? (
					<>
						<MdPauseCircleOutline /> Pause
					</>
				) : (
					<>
						<MdPlayCircleOutline /> Resume
					</>
				)}
			</button>
		</Dropdown.Item>
	);
};

export default MonitorDropdownUpdateActiveStatus;
