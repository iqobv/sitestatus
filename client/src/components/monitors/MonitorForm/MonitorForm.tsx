'use client';

import {
	Checkbox,
	Form,
	FormActions,
	FormField,
	FormReset,
	FormSubmit,
	TextField,
} from '@/components/ui';
import { FieldValues } from 'react-hook-form';
import styles from './MonitorForm.module.scss';
import { MonitorFormProps } from './MonitorForm.types';
import { MonitorFormProject } from './MonitorFormProject/MonitorFormProject';
import { MonitorFormRegions } from './MonitorFormRegions/MonitorFormRegions';

export const MonitorForm = <D extends FieldValues, R extends { id: string }>({
	fields,
	buttonLabel = 'Create Monitor',
	isLoading = false,
	...props
}: MonitorFormProps<D, R>) => {
	return (
		<Form<D> className={styles.form} {...props}>
			{fields.map(({ name, type, leftIcon, rightIcon: _, ...rest }) => {
				const Icon = leftIcon;

				return (
					<FormField key={name} name={name}>
						{type === 'checkbox' ? (
							<Checkbox label={rest.label} />
						) : (
							<TextField leftIcon={Icon ? <Icon /> : undefined} {...rest} />
						)}
					</FormField>
				);
			})}
			<MonitorFormRegions />
			<MonitorFormProject />
			<FormActions>
				<FormReset buttonProps={{ variant: 'secondary' }}>Cancel</FormReset>
				<FormSubmit
					buttonProps={{
						loading: isLoading,
					}}
				>
					{buttonLabel}
				</FormSubmit>
			</FormActions>
		</Form>
	);
};
