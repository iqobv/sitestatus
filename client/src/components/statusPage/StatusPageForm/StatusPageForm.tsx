'use client';

import {
	Checkbox,
	Form,
	FormProps,
	Textarea,
	TextField,
} from '@/components/ui';
import { StatusPageMonitorDto, UpdateStatusPageDto } from '@/dto';
import { Field } from '@/types';
import { Control, FieldValues, Path, useWatch } from 'react-hook-form';
import { SlugAutoGenerator } from './SlugAutoGenerator';
import styles from './StatusPageForm.module.scss';
import StatusPageFormMonitors from './StatusPageFormMonitors/StatusPageFormMonitors';

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

const StatusPageForm = <D extends FieldValues>({
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
							<Form.Field name="isAutoSync">
								<Checkbox label="Auto Sync Slug" />
							</Form.Field>
							{fields.map((field) => (
								<Form.Field<D> name={field.name} key={field.name}>
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
								</Form.Field>
							))}
							<StatusPageFormMonitors
								control={
									methods.control as unknown as Control<StatusPageFormDto>
								}
							/>
							<Form.Actions className={styles.formActions}>
								<Form.Submit disabledOnEmpty>Save</Form.Submit>
							</Form.Actions>
						</>
					);
				}}
			</Form>
		</div>
	);
};

export default StatusPageForm;
