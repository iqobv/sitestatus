import { Dropdown, Modal } from '@/components/ui';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import AlertSettingsForm, { AlertSettingsFormProps } from './AlertSettingsForm';

const AlertSettingsFormModal = ({ id, type }: AlertSettingsFormProps) => {
	return (
		<Modal>
			<Modal.Trigger>
				<Dropdown.Item asChild closeOnClick={false}>
					<button>
						<MdOutlineNotificationsActive size={20} />
						Alert Settings
					</button>
				</Dropdown.Item>
			</Modal.Trigger>
			<Modal.Content>
				<AlertSettingsForm id={id} type={type} />
			</Modal.Content>
		</Modal>
	);
};

export default AlertSettingsFormModal;
