'use client';

import { AlertSettingsFormModal } from '@/components/alerts';

interface MonitorDropdownAlertSettingsProps {
	id: string;
}

const MonitorDropdownAlertSettings = ({
	id,
}: MonitorDropdownAlertSettingsProps) => {
	return <AlertSettingsFormModal id={id} type="monitor" />;

	// const [overrideSettings, setOverrideSettings] = useState(false);
	// const [monitorSettings, setMonitorSettings] = useState<AlertSettings | null>(
	// 	null,
	// );
	// const [isGlobalSettings, setIsGlobalSettings] = useState(false);

	// const { data: alertSettings, refetch } = useQuery({
	// 	queryKey: QUERY_KEYS.alertSettings.hierarchy(id),
	// 	queryFn: () => getAlertSettingsHierarchy({ monitorId: id }),
	// });

	// const { data: notificationChannels } = useQuery({
	// 	queryKey: QUERY_KEYS.notificationChannel.all,
	// 	queryFn: getAllNotificationChannels,
	// });

	// const { mutate, isPending } = useMutation({
	// 	mutationFn: (data: UpsertAlertSettingsDto) => upsertAlertSettings(data),
	// 	onSuccess: () => {
	// 		refetch();
	// 	},
	// 	onError: (e) => {
	// 		toast.error(e.message || 'Failed to save alert settings');
	// 	},
	// });

	// useEffect(() => {
	// 	if (alertSettings) {
	// 		const monitorSettings = alertSettings.find((s) => s.monitorId === id);
	// 		const globalSettings = alertSettings.find((s) => s.monitorId === null);

	// 		if (monitorSettings) {
	// 			setMonitorSettings(monitorSettings);
	// 			setOverrideSettings(true);
	// 			setIsGlobalSettings(false);
	// 		} else {
	// 			setMonitorSettings(globalSettings ?? null);
	// 			setIsGlobalSettings(true);
	// 		}
	// 	}
	// }, [alertSettings, id]);

	// return (
	// 	<Modal>
	// 		<Modal.Trigger>
	// 			<Dropdown.Item asChild closeOnClick={false}>
	// 				<button className={styles.dropdownItem}>
	// 					<MdOutlineNotificationsActive size={20} />
	// 					Alert Settings
	// 				</button>
	// 			</Dropdown.Item>
	// 		</Modal.Trigger>
	// 		<Modal.Content>
	// 			{monitorSettings && (
	// 				<Form<UpsertAlertSettingsDto>
	// 					schema={upsertAlertSettingsSchema}
	// 					defaultValues={{
	// 						isEnabled: monitorSettings.isEnabled,
	// 						onDown: monitorSettings.onDown,
	// 						onUp: monitorSettings.onUp,
	// 						delay: monitorSettings.delay,
	// 						channelIds: monitorSettings.channels.map((c) => c.id),
	// 						monitorId: monitorSettings.monitorId ?? id,
	// 						projectId: monitorSettings.projectId ?? undefined,
	// 					}}
	// 					onSubmit={(data) => mutate(data)}
	// 				>
	// 					{({ formState: { errors } }) => (
	// 						<>
	// 							<Modal.Header>Monitor Alert Settings</Modal.Header>
	// 							<Modal.Body>
	// 								{isGlobalSettings && (
	// 									<div>
	// 										<p>
	// 											Your monitor is currently using global alert settings.
	// 											To override and set up custom alert settings for this
	// 											monitor, toggle the "Override Global Settings" option
	// 											below.
	// 										</p>
	// 										<Checkbox
	// 											label="Override Global Settings"
	// 											checked={overrideSettings}
	// 											onChange={(e) => setOverrideSettings(e.target.checked)}
	// 										/>
	// 									</div>
	// 								)}
	// 								<Form.Field name="isEnabled">
	// 									<Checkbox
	// 										label="Enable Alerts"
	// 										error={errors.isEnabled?.message as string}
	// 										disabled={isGlobalSettings && !overrideSettings}
	// 									/>
	// 								</Form.Field>
	// 								{GLOBAL_ALERT_SETTINGS_FIELDS.map((f) => (
	// 									<Form.Field
	// 										key={f.name}
	// 										name={f.name as keyof UpsertAlertSettingsDto}
	// 									>
	// 										{({ field }) => {
	// 											const errorMessage =
	// 												(errors[f.name as keyof typeof errors]
	// 													?.message as string) ?? '';

	// 											if (f.type === 'checkbox') {
	// 												return (
	// 													<Checkbox
	// 														label={f.label}
	// 														error={errorMessage}
	// 														disabled={isGlobalSettings && !overrideSettings}
	// 														{...field}
	// 														checked={Boolean(field.value)}
	// 													/>
	// 												);
	// 											}

	// 											return (
	// 												<TextField
	// 													type={f.type}
	// 													label={f.label}
	// 													placeholder={f.placeholder}
	// 													error={errorMessage}
	// 													disabled={isGlobalSettings && !overrideSettings}
	// 													{...field}
	// 												/>
	// 											);
	// 										}}
	// 									</Form.Field>
	// 								))}
	// 								{notificationChannels && notificationChannels.length > 0 && (
	// 									<Form.Field isController name="channelIds">
	// 										{({ field }) => (
	// 											<Select
	// 												label="Notification Channels"
	// 												placeholder="Select notification channels"
	// 												options={notificationChannels
	// 													.filter((c) => c.isActive)
	// 													.map((channel) => ({
	// 														label: channel.name,
	// 														value: channel.id,
	// 													}))}
	// 												value={field.value}
	// 												onChange={(value) => field.onChange(value)}
	// 												multiple
	// 												disabled={isGlobalSettings && !overrideSettings}
	// 											/>
	// 										)}
	// 									</Form.Field>
	// 								)}
	// 							</Modal.Body>
	// 							<Modal.Footer>
	// 								<Form.Actions justifyContent="flex-end">
	// 									<Modal.Close>
	// 										<Form.Reset buttonProps={{ variant: 'outlined' }}>
	// 											Cancel
	// 										</Form.Reset>
	// 									</Modal.Close>
	// 									<Form.Submit
	// 										disabledOnEmpty
	// 										buttonProps={{ loading: isPending }}
	// 									>
	// 										Save
	// 									</Form.Submit>
	// 								</Form.Actions>
	// 							</Modal.Footer>
	// 						</>
	// 					)}
	// 				</Form>
	// 			)}
	// 		</Modal.Content>
	// 	</Modal>
	// );
};

export default MonitorDropdownAlertSettings;
