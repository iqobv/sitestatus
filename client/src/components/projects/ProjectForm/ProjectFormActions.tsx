'use client';

import { FormActions, FormReset, FormSubmit } from '@/components/ui';

interface ProjectFormActionsProps {
	isEdit: boolean;
	isPending: boolean;
	buttonLabel: string;
}

export const ProjectFormActions = ({
	isEdit,
	isPending,
	buttonLabel,
}: ProjectFormActionsProps) => {
	return (
		<FormActions justifyContent="flex-end">
			{isEdit && (
				<FormReset buttonProps={{ variant: 'secondary' }} disabledOnEmpty>
					Cancel
				</FormReset>
			)}
			<FormSubmit buttonProps={{ loading: isPending }} disabledOnEmpty>
				{buttonLabel}
			</FormSubmit>
		</FormActions>
	);
};
