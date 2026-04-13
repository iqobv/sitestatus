'use client';

import { Modal } from '@/components/ui';
import { useRouter } from 'next/navigation';
import CreateMonitor from './CreateMonitor';

const CreateMonitorFormModal = () => {
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
				<Modal.Header>Create New Monitor</Modal.Header>
				<Modal.Body>
					<CreateMonitor />
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default CreateMonitorFormModal;
