'use client';

import {
	Checkbox,
	Field,
	Form,
	FormActions,
	FormField,
	FormReset,
	FormSelect,
	FormSubmit,
	SelectItem,
	TextField,
} from '@/components/ui';
import { FieldValues } from 'react-hook-form';
import styles from './MonitorForm.module.scss';
import { MonitorFormProps } from './MonitorForm.types';
import { MonitorFormProject } from './MonitorFormProject/MonitorFormProject';
import { MonitorFormRegions } from './MonitorFormRegions/MonitorFormRegions';

export const MonitorForm = <D extends FieldValues>({
	fields,
	buttonLabel = 'Create Monitor',
	isLoading = false,
	...props
}: MonitorFormProps<D>) => {
	return (
		<Form<D> className={styles.form} {...props}>
			{fields.map(
				({
					name,
					type,
					leftIcon,
					rightIcon: _,
					options,
					isRequired,
					label,
					...rest
				}) => {
					const Icon = leftIcon;

					if (type === 'select' && options) {
						return (
							<Field label={label} key={name} required={isRequired}>
								<FormSelect name={name} placeholder={rest.placeholder}>
									{options.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</FormSelect>
							</Field>
						);
					}

					return (
						<FormField
							key={name}
							name={name}
							required={isRequired}
							label={type !== 'checkbox' && label}
						>
							{type === 'checkbox' ? (
								<Checkbox label={label} />
							) : (
								<TextField leftIcon={Icon ? <Icon /> : undefined} {...rest} />
							)}
						</FormField>
					);
				},
			)}
			<MonitorFormRegions />
			<MonitorFormProject />
			<FormActions>
				<FormReset buttonProps={{ color: 'secondary' }}>Cancel</FormReset>
				<FormSubmit
					buttonProps={{
						loading: isLoading,
					}}
					disabledOnEmpty
				>
					{buttonLabel}
				</FormSubmit>
			</FormActions>
		</Form>
	);
};
