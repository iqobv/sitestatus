'use client';

import { AlertSettingsFormModal } from '@/components/alerts/AlertSettingsForm/AlertSettingsFormModal';

interface ProjectHeaderDropdownItemAlertSettingsProps {
	id: string;
}

export const ProjectHeaderDropdownItemAlertSettings = ({
	id,
}: ProjectHeaderDropdownItemAlertSettingsProps) => {
	return <AlertSettingsFormModal id={id} type="project" />;
};
