'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@/components/ui';
import { useParams, useRouter } from 'next/navigation';
import { UpdateMonitor } from './UpdateMonitor';

export const UpdateMonitorFormModal = () => {
	const { id: monitorId } = useParams<{ id: string }>();

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
				<ModalHeader>Update Monitor</ModalHeader>
				<ModalBody>
					<UpdateMonitor monitorId={monitorId} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
