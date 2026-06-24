'use client';

import {
	Checkbox,
	Form,
	FormActions,
	FormField,
	FormProps,
	FormSubmit,
	Textarea,
	TextField,
} from '@/components/ui';
import { StatusPageMonitorDto, UpdateStatusPageDto } from '@/dto';
import { Field } from '@/types';
import { Control, FieldValues, Path, useWatch } from 'react-hook-form';
import { SlugAutoGenerator } from './SlugAutoGenerator';
import styles from './StatusPageForm.module.scss';
import { StatusPageFormMonitors } from './StatusPageFormMonitors/StatusPageFormMonitors';

interface StatusPageFormProps<D extends FieldValues> extends Omit<
	FormProps<D>,
	'children'
> {
	fields: Field<D>[];
}

export interface StatusPageMonitor extends StatusPageMonitorDto {
	initMonitorName: string;
}

export interface StatusPageFormDto extends Omit<
	UpdateStatusPageDto,
	'monitors'
> {
	isAutoSync: boolean;
	monitors: StatusPageMonitor[];
}

export const StatusPageForm = <D extends FieldValues>({
	fields,
	...props
}: StatusPageFormProps<D>) => {
	return (
		<div className={styles.formWrapper}>
			<Form<D> {...props}>
				{(methods) => {
					const isAutoSync = useWatch({
						control: methods.control,
						name: 'isAutoSync' as Path<D>,
					});

					return (
						<>
							<SlugAutoGenerator<D>
								source={'title' as Path<D>}
								target={'slug' as Path<D>}
								autoSync={isAutoSync}
							/>
							<FormField name="isAutoSync">
								<Checkbox label="Auto Sync Slug" />
							</FormField>
							{fields.map((field) => (
								<FormField<D> name={field.name} key={field.name}>
									{field.type === 'textarea' ? (
										<Textarea
											label={field.label}
											placeholder={field.placeholder}
											maxRows={3}
											minRows={1}
											maxLength={250}
										/>
									) : (
										<TextField
											label={field.label}
											placeholder={field.placeholder}
										/>
									)}
								</FormField>
							))}
							<StatusPageFormMonitors
								control={
									methods.control as unknown as Control<StatusPageFormDto>
								}
							/>
							<FormActions className={styles.formActions}>
								<FormSubmit disabledOnEmpty>Save</FormSubmit>
							</FormActions>
						</>
					);
				}}
			</Form>
		</div>
	);
};
