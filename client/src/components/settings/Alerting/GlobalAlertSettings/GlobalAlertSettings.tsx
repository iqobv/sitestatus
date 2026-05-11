'use client';

import { getAlertSettingsHierarchy } from '@/api';
import { Checkbox, SectionHeader, TextField } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import SettingsCard from '../../SettingsCard/SettingsCard';
import styles from './GlobalAlertSettings.module.scss';
import GlobalAlertSettingsEdit from './GlobalAlertSettingsEdit';
import GlobalAlertSettingsLoader from './GlobalAlertSettingsLoader';
import { GLOBAL_ALERT_SETTINGS_FIELDS } from './globalAlertSettingsFields';

const GlobalAlertSettings = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.alertSettings.hierarchy('global'),
		queryFn: () => getAlertSettingsHierarchy(),
	});

	return (
		<div className={styles.alert}>
			<SectionHeader
				title={
					<div className={styles.header}>
						<span>Global Alert Settings</span>
					</div>
				}
				titleComponent="h3"
			/>
			{isLoading && <GlobalAlertSettingsLoader />}
			{data && data.length > 0 && (
				<div className={styles.list}>
					{data.map((setting) => (
						<SettingsCard
							desktopDirection="column"
							title="Global Alert Settings"
							key={setting.id}
							description={
								<>
									{GLOBAL_ALERT_SETTINGS_FIELDS.map(
										({
											name,
											type,
											leftIcon: _leftIcon,
											rightIcon: _rightIcon,
											...field
										}) => {
											if (type === 'checkbox')
												return (
													<Checkbox
														key={name}
														label={field.label}
														name={name}
														readOnly
														disabled
														checked={
															setting[name as keyof typeof setting] as boolean
														}
													/>
												);

											return (
												<TextField
													key={name}
													value={
														setting[name as keyof typeof setting] as
															| string
															| number
													}
													readOnly
													{...field}
												/>
											);
										},
									)}
								</>
							}
							action={
								<div className={styles.actions}>
									<GlobalAlertSettingsEdit data={setting} />
								</div>
							}
							actionJustify="flex-end"
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default GlobalAlertSettings;
