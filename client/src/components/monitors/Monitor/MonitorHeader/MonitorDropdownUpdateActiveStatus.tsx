'use client';

import { updateMonitorActiveStatus } from '@/api';
import { Dropdown } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { Monitor } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { MdPauseCircleOutline, MdPlayCircleOutline } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';
import { useMonitorDropdownItemMutation } from './useMonitorDropdownItemMutation.hook';

interface MonitorDropdownUpdateActiveStatusProps {
	monitor: Monitor;
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
		<Dropdown.Item onClick={handleUpdate}>
			<div className={styles['monitor-header__dropdown-item']}>
				{monitor.isActive ? (
					<>
						<MdPauseCircleOutline /> Pause
					</>
				) : (
					<>
						<MdPlayCircleOutline /> Resume
					</>
				)}
			</div>
		</Dropdown.Item>
	);
};

export default MonitorDropdownUpdateActiveStatus;
