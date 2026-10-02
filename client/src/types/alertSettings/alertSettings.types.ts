import { getAlertSettingsHierarchy } from '@/api/alertSettings/getAlertSettings.api';

export type AlertSettings = Awaited<
	ReturnType<typeof getAlertSettingsHierarchy>
>[number];
