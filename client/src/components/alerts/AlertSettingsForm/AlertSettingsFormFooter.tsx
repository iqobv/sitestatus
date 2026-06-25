'use client';

import {
	FormActions,
	FormReset,
	FormSubmit,
	ModalClose,
	ModalFooter,
} from '@/components/ui';

interface AlertSettingsFormFooterProps {
	isPending: boolean;
}

export const AlertSettingsFormFooter = ({
	isPending,
}: AlertSettingsFormFooterProps) => {
	return (
		<ModalFooter>
			<FormActions justifyContent="flex-end">
				<ModalClose>
					<FormReset buttonProps={{ variant: 'outlined' }}>Cancel</FormReset>
				</ModalClose>
				<FormSubmit disabledOnEmpty buttonProps={{ loading: isPending }}>
					Save
				</FormSubmit>
			</FormActions>
		</ModalFooter>
	);
};
