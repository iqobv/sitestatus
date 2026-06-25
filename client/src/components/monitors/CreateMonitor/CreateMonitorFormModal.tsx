'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { CreateMonitor } from './CreateMonitor';

export const CreateMonitorFormModal = () => {
	const router = useRouter();

	return (
		<Modal
			withoutTrigger
			renderOnMount
			onClose={() => {
				router.back();
			}}
		>
			<ModalContent>
				<ModalHeader>Create New Monitor</ModalHeader>
				<ModalBody>
					<CreateMonitor />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
