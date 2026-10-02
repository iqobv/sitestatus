'use client';

import { Select } from '@/components/ui/Select/Select';
import { SelectContent } from '@/components/ui/Select/SelectContent/SelectContent';
import { SelectTrigger } from '@/components/ui/Select/SelectTrigger/SelectTrigger';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { FormSelectProps } from './FormSelect.types';

export const FormSelect = <T extends FieldValues>({
	control,
	name,
	children,
	placeholder,
	className = '',
	id,
	style,
	disabled = false,
	onScrollEnd,
	scrollThreshold,
	isClearable = false,
	zIndex,
	width,
}: FormSelectProps<T>) => {
	const formContext = useFormContext<T>();
	const resolvedControl = control || formContext?.control;

	if (!resolvedControl)
		throw new Error(
			'FormSelect requires either a control prop or to be nested within a FormProvider',
		);

	const {
		field: { value, onChange },
	} = useController({
		name,
		control: resolvedControl,
	});

	const handleClear = () => onChange('');

	const canClear = isClearable && !disabled && Boolean(value);

	return (
		<Select value={value ?? ''} onValueChange={onChange} disabled={disabled}>
			<SelectTrigger
				placeholder={placeholder}
				className={className}
				id={id}
				style={style}
				disabled={disabled}
				showClearButton={canClear}
				onClear={handleClear}
			/>
			<SelectContent
				onScrollEnd={onScrollEnd}
				scrollThreshold={scrollThreshold}
				width={width}
				style={{ ...(zIndex && { zIndex }) }}
			>
				{children}
			</SelectContent>
		</Select>
	);
};
