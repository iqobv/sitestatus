'use client';

import { AlertSettingsFormModal } from '@/components/alerts';

interface MonitorDropdownAlertSettingsProps {
	id: string;
}

const MonitorDropdownAlertSettings = ({
	id,
}: MonitorDropdownAlertSettingsProps) => {
	return <AlertSettingsFormModal id={id} type="monitor" />;
};

export default MonitorDropdownAlertSettings;
