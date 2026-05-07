'use client';

import { Form } from '@/components/ui';

interface ProjectFormActionsProps {
	isEdit: boolean;
	isPending: boolean;
	buttonLabel: string;
}

const ProjectFormActions = ({
	isEdit,
	isPending,
	buttonLabel,
}: ProjectFormActionsProps) => {
	return (
		<Form.Actions justifyContent="flex-end">
			{isEdit && (
				<Form.Reset buttonProps={{ variant: 'secondary' }} disabledOnEmpty>
					Cancel
				</Form.Reset>
			)}
			<Form.Submit buttonProps={{ loading: isPending }} disabledOnEmpty>
				{buttonLabel}
			</Form.Submit>
		</Form.Actions>
	);
};

export default ProjectFormActions;
