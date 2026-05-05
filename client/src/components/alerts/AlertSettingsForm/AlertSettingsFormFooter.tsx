'use client';

import { Form, Modal } from '@/components/ui';

interface AlertSettingsFormFooterProps {
	isPending: boolean;
}

const AlertSettingsFormFooter = ({
	isPending,
}: AlertSettingsFormFooterProps) => {
	return (
		<Modal.Footer>
			<Form.Actions justifyContent="flex-end">
				<Modal.Close>
					<Form.Reset buttonProps={{ variant: 'outlined' }}>Cancel</Form.Reset>
				</Modal.Close>
				<Form.Submit disabledOnEmpty buttonProps={{ loading: isPending }}>
					Save
				</Form.Submit>
			</Form.Actions>
		</Modal.Footer>
	);
};

export default AlertSettingsFormFooter;
