import {
	DropdownItem,
	Modal,
	ModalContent,
	ModalTrigger,
} from '@/components/ui';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { AlertSettingsForm, AlertSettingsFormProps } from './AlertSettingsForm';

export const AlertSettingsFormModal = ({
	id,
	type,
}: AlertSettingsFormProps) => {
	return (
		<Modal>
			<ModalTrigger>
				<DropdownItem asChild closeOnClick={false}>
					<button>
						<MdOutlineNotificationsActive size={20} />
						Alert Settings
					</button>
				</DropdownItem>
			</ModalTrigger>
			<ModalContent>
				<AlertSettingsForm id={id} type={type} />
			</ModalContent>
		</Modal>
	);
};
