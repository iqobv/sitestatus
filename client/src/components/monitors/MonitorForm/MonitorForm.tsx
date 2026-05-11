'use client';

import { Checkbox, Form, TextField } from '@/components/ui';
import { FieldValues } from 'react-hook-form';
import { MonitorFormProps } from './MonitorForm.types';
import MonitorFormProject from './MonitorFormProject/MonitorFormProject';
import MonitorFormRegions from './MonitorFormRegions/MonitorFormRegions';
import styles from './MonitorForm.module.scss';

const MonitorForm = <D extends FieldValues, R extends { id: string }>({
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
					<Form.Field key={name} name={name}>
						{type === 'checkbox' ? (
							<Checkbox label={rest.label} />
						) : (
							<TextField leftIcon={Icon ? <Icon /> : undefined} {...rest} />
						)}
					</Form.Field>
				);
			})}
			<MonitorFormRegions />
			<MonitorFormProject />
			<Form.Actions>
				<Form.Reset buttonProps={{ variant: 'secondary' }}>Cancel</Form.Reset>
				<Form.Submit
					buttonProps={{
						loading: isLoading,
					}}
				>
					{buttonLabel}
				</Form.Submit>
			</Form.Actions>
		</Form>
	);
};

export default MonitorForm;
