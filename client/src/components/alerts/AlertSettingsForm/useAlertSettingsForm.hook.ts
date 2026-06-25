'use client';

import { getAlertSettingsHierarchy } from '@/api/alertSettings/getAlertSettings.api';
import { upsertAlertSettings } from '@/api/alertSettings/upsertAlertSettings.api';
import { getAllNotificationChannels } from '@/api/notificationChannel/getAllNotificationChannel.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpsertAlertSettingsDto } from '@/dto/alertSettings.dto';
import { AlertSettings } from '@/types/notificationChannel/alertSettings.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AlertSettingsFormProps } from './AlertSettingsForm';

export const useAlertSettingsForm = ({ id, type }: AlertSettingsFormProps) => {
	const [overrideSettings, setOverrideSettings] = useState(false);
	const [currentSettings, setCurrentSettings] = useState<AlertSettings | null>(
		null,
	);
	const [isGlobalSettings, setIsGlobalSettings] = useState(false);

	const { data: alertSettings, refetch } = useQuery({
		queryKey: QUERY_KEYS.alertSettings.hierarchy(id),
		queryFn: () =>
			getAlertSettingsHierarchy(
				type === 'monitor' ? { monitorId: id } : { projectId: id },
			),
	});

	const { data: notificationChannels } = useQuery({
		queryKey: QUERY_KEYS.notificationChannels.lists(),
		queryFn: getAllNotificationChannels,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UpsertAlertSettingsDto) => upsertAlertSettings(data),
		onSuccess: () => {
			refetch();
		},
		onError: (e) => {
			toast.error(e.message || 'Failed to save alert settings');
		},
	});

	useEffect(() => {
		if (alertSettings) {
			const settingFound = alertSettings.find((s) =>
				type === 'monitor' ? s.monitorId === id : s.projectId === id,
			);
			const globalSettings = alertSettings.find((s) =>
				type === 'monitor' ? s.monitorId === null : s.projectId === null,
			);

			if (settingFound) {
				setCurrentSettings(settingFound);
				setOverrideSettings(true);
				setIsGlobalSettings(false);
			} else {
				setCurrentSettings(globalSettings ?? null);
				setIsGlobalSettings(true);
				setOverrideSettings(false);
			}
		}
	}, [alertSettings, id]);

	return {
		currentSettings,
		notificationChannels,
		mutate,
		isPending,
		overrideSettings,
		setOverrideSettings,
		isGlobalSettings,
	};
};
