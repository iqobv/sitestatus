'use client';

import { Checkbox, Form, Textarea, TextField } from '@/components/ui';
import { UpdateStatusPageDto } from '@/dto';
import { updateStatusPageSchema } from '@/schemas';
import { FullStatusPage } from '@/types';
import { useWatch } from 'react-hook-form';
import { SlugAutoGenerator } from './SlugAutoGenerator';
import styles from './StatusPageDetailsForm.module.scss';

interface StatusPageDetailsFormProps {
	data: FullStatusPage;
}

type StatusPageFormDto = UpdateStatusPageDto & { isAutoSync: boolean };

const StatusPageDetailsForm = ({ data }: StatusPageDetailsFormProps) => {
	return (
		<div className={styles.statusPageDetailsForm}>
			<Form<StatusPageFormDto>
				schema={updateStatusPageSchema}
				defaultValues={{
					title: data.title,
					description: data.description,
					slug: data.slug,
					monitors: data.monitors.map((m) => ({
						id: m.id,
						displayName: m.displayName,
						sortOrder: m.sortOrder,
					})),
					isPublished: data.isPublished,
					isAutoSync: true,
				}}
			>
				{(methods) => {
					const isAutoSync = useWatch({
						control: methods.control,
						name: 'isAutoSync',
					});

					return (
						<>
							<Form.Field name="isAutoSync">
								<Checkbox label="Auto Sync Slug" />
							</Form.Field>
							<SlugAutoGenerator<StatusPageFormDto>
								source="title"
								target="slug"
								autoSync={isAutoSync}
							/>
							<Form.Field<StatusPageFormDto> name="title">
								<TextField label="Title" placeholder="Title" />
							</Form.Field>
							<Form.Field<StatusPageFormDto> name="slug">
								<TextField
									label="Slug"
									placeholder="slug"
									readOnly={isAutoSync}
								/>
							</Form.Field>
							<Form.Field<StatusPageFormDto> name="description">
								<Form.Label htmlFor="description">Description</Form.Label>
								<Textarea
									placeholder="Description"
									maxLength={250}
									id="description"
									maxRows={3}
									minRows={1}
								/>
							</Form.Field>
							<Form.Actions>
								<Form.Submit disabledOnEmpty>Save</Form.Submit>
							</Form.Actions>
						</>
					);
				}}
			</Form>
		</div>
	);
};

export default StatusPageDetailsForm;
