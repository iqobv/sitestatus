'use client';

import { AlertSettingsFormModal } from '@/components/alerts';

interface ProjectHeaderDropdownItemAlertSettingsProps {
	id: string;
}

const ProjectHeaderDropdownItemAlertSettings = ({
	id,
}: ProjectHeaderDropdownItemAlertSettingsProps) => {
	return <AlertSettingsFormModal id={id} type="project" />;
};

export default ProjectHeaderDropdownItemAlertSettings;
