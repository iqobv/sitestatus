'use client';

import { deleteMonitor } from '@/api/monitor/deleteMonitor.api';
import {
	Button,
	DropdownItem,
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
} from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdOutlineDelete } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';
import { useMonitorDropdownItemMutation } from './useMonitorDropdownItemMutation.hook';

interface MonitorDeleteModalProps {
	id: string;
}

export const MonitorDeleteModal = ({ id }: MonitorDeleteModalProps) => {
	const queryClient = new QueryClient();
	const router = useRouter();

	const { mutate } = useMonitorDropdownItemMutation({
		monitorId: id,
		mutationFn: deleteMonitor,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.monitors.lists() });
			router.push(PRIVATE_PAGES.DASHBOARD);
		},
	});

	return (
		<Modal>
			<ModalTrigger>
				<DropdownItem asChild isDelete closeOnClick={false}>
					<button className={`${styles.dropdownItem} ${styles.delete}`}>
						<MdOutlineDelete size={20} />
						Delete
					</button>
				</DropdownItem>
			</ModalTrigger>
			<ModalContent>
				<ModalHeader>Delete Monitor</ModalHeader>
				<ModalBody>
					<p>Are you sure you want to delete this monitor?</p>
				</ModalBody>
				<ModalFooter className={styles.monitorDeleteFooter}>
					<ModalClose>
						<Button variant="contained">Cancel</Button>
					</ModalClose>
					<ModalClose>
						<Button variant="danger" onClick={() => mutate()}>
							Delete
						</Button>
					</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
