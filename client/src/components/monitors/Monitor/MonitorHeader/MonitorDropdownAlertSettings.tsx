'use client';

import { AlertSettingsFormModal } from '@/components/alerts/AlertSettingsForm/AlertSettingsFormModal';

interface MonitorDropdownAlertSettingsProps {
	id: string;
}

export const MonitorDropdownAlertSettings = ({
	id,
}: MonitorDropdownAlertSettingsProps) => {
	return <AlertSettingsFormModal id={id} type="monitor" />;
};
