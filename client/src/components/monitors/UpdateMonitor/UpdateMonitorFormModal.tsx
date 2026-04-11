'use client';

import { Modal } from '@/components/ui';
import { useParams, useRouter } from 'next/navigation';
import UpdateMonitor from './UpdateMonitor';

const UpdateMonitorFormModal = () => {
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
			<Modal.Content>
				<Modal.Header>Update Monitor</Modal.Header>
				<Modal.Body>
					<UpdateMonitor monitorId={monitorId} />
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default UpdateMonitorFormModal;
