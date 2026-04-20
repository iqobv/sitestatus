'use client';

import React, {
	ComponentPropsWithRef,
	ElementType,
	isValidElement,
} from 'react';
import {
	Controller,
	FieldValues,
	get,
	Path,
	UseControllerReturn,
	useFormContext,
} from 'react-hook-form';
import styles from './FormField.module.scss';

type ControlledRenderFn<T extends FieldValues> = (
	props: UseControllerReturn<T, Path<T>>,
) => React.ReactNode;

type FormChild<T extends FieldValues> = React.ReactNode | ControlledRenderFn<T>;

interface FormFieldProps<T extends FieldValues> {
	name: Path<T>;
	children: FormChild<T>;
	isController?: boolean;
}

const FormField = <T extends FieldValues>({
	name,
	children,
	isController = false,
}: FormFieldProps<T>) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<T>();

	const fieldError = get(errors, name);
	const errorMessage = fieldError?.message as string | undefined;

	const renderChildren = (child: FormChild<T>): React.ReactNode => {
		if (typeof child === 'function') {
			return (
				<Controller
					name={name}
					control={control}
					render={(props) =>
						(child as ControlledRenderFn<T>)(props) as React.ReactElement
					}
				/>
			);
		}

		return React.Children.map(child, (item) => {
			if (!isValidElement(item)) return item;

			const itemType = item.type as ElementType;
			const isLabel =
				item.type === 'label' ||
				(typeof itemType !== 'string' &&
					'displayName' in itemType &&
					itemType.displayName === 'FormLabel');

			if (isLabel) return item;

			const { ref, ...registerProps } = register(name);

			if (isController) {
				return (
					<Controller
						name={name}
						control={control}
						render={({ field }) =>
							React.cloneElement(
								item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
								{ ...field, error: errorMessage },
							)
						}
					/>
				);
			}

			return React.cloneElement(
				item as React.ReactElement<ComponentPropsWithRef<ElementType>>,
				{
					...registerProps,
					ref,
					error: errorMessage,
				},
			);
		});
	};

	return <div className={styles.formField}>{renderChildren(children)}</div>;
};

export default FormField;
