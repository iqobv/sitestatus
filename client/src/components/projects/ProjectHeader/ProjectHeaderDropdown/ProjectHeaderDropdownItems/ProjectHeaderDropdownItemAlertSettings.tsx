'use client';

import { AlertSettingsFormModal } from '@/components/alerts';

interface ProjectHeaderDropdownItemAlertSettingsProps {
	id: string;
}

const ProjectHeaderDropdownItemAlertSettings = ({
	id,
}: ProjectHeaderDropdownItemAlertSettingsProps) => {
	return <AlertSettingsFormModal id={id} type="project" />;
	// const [overrideSettings, setOverrideSettings] = useState(false);
	// const [projectSettings, setProjectSettings] = useState<AlertSettings | null>(
	// 	null,
	// );
	// const [isGlobalSettings, setIsGlobalSettings] = useState(false);

	// const { data: alertSettings, refetch } = useQuery({
	// 	queryKey: QUERY_KEYS.alertSettings.hierarchy(id),
	// 	queryFn: () => getAlertSettingsHierarchy({ projectId: id }),
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
	// 		const projectSettings = alertSettings.find((s) => s.projectId === id);
	// 		const globalSettings = alertSettings.find((s) => s.projectId === null);

	// 		if (projectSettings) {
	// 			setProjectSettings(projectSettings);
	// 			setOverrideSettings(true);
	// 			setIsGlobalSettings(false);
	// 		} else {
	// 			setProjectSettings(globalSettings ?? null);
	// 			setIsGlobalSettings(true);
	// 			setOverrideSettings(false);
	// 		}
	// 	}
	// }, [alertSettings, id]);

	// return (
	// 	<Modal>
	// 		<Modal.Trigger>
	// 			<Dropdown.Item asChild closeOnClick={false}>
	// 				<button>
	// 					<MdOutlineNotificationsActive size={20} />
	// 					Alert Settings
	// 				</button>
	// 			</Dropdown.Item>
	// 		</Modal.Trigger>
	// 		<Modal.Content>
	// 			{projectSettings && (
	// 				<Form<UpsertAlertSettingsDto>
	// 					schema={upsertAlertSettingsSchema}
	// 					defaultValues={{
	// 						isEnabled: projectSettings.isEnabled,
	// 						onDown: projectSettings.onDown,
	// 						onUp: projectSettings.onUp,
	// 						delay: projectSettings.delay,
	// 						channelIds: projectSettings.channels.map((c) => c.id),
	// 						monitorId: projectSettings.monitorId ?? undefined,
	// 						projectId: projectSettings.projectId ?? id,
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

export default ProjectHeaderDropdownItemAlertSettings;
