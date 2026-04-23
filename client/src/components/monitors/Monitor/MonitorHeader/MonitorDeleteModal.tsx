'use client';

import { deleteMonitor } from '@/api';
import { Button, Dropdown, Modal } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdOutlineDelete } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';
import { useMonitorDropdownItemMutation } from './useMonitorDropdownItemMutation.hook';

interface MonitorDeleteModalProps {
	id: string;
}

const MonitorDeleteModal = ({ id }: MonitorDeleteModalProps) => {
	const queryClient = new QueryClient();
	const router = useRouter();

	const { mutate } = useMonitorDropdownItemMutation({
		monitorId: id,
		mutationFn: deleteMonitor,
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: QUERY_KEYS.monitors.list });
			router.push(PRIVATE_PAGES.DASHBOARD);
		},
	});

	return (
		<Modal>
			<Modal.Trigger>
				<Dropdown.Item asChild closeOnClick={false}>
					<button className={`${styles.dropdownItem} ${styles.delete}`}>
						<MdOutlineDelete size={20} />
						Delete
					</button>
				</Dropdown.Item>
			</Modal.Trigger>
			<Modal.Content>
				<Modal.Header>Delete Monitor</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this monitor?</p>
				</Modal.Body>
				<Modal.Footer className={styles.monitorDeleteFooter}>
					<Modal.Close>
						<Button variant="contained">Cancel</Button>
					</Modal.Close>
					<Modal.Close>
						<Button variant="danger" onClick={() => mutate()}>
							Delete
						</Button>
					</Modal.Close>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
};

export default MonitorDeleteModal;
