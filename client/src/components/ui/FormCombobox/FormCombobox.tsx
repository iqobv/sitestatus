'use client';

import { Combobox } from '@/components/ui/Combobox/Combobox';
import { ComboboxContent } from '@/components/ui/Combobox/ComboboxContent/ComboboxContent';
import { ComboboxEmpty } from '@/components/ui/Combobox/ComboboxEmpty/ComboboxEmpty';
import { ComboboxItem } from '@/components/ui/Combobox/ComboboxItem/ComboboxItem';
import { ComboboxTrigger } from '@/components/ui/Combobox/ComboboxTrigger/ComboboxTrigger';
import { CommandGroup } from 'cmdk';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { FormComboboxProps } from './FormCombobox.types';

export const FormCombobox = <T extends FieldValues>({
	name,
	control,
	options,
	placeholder,
	searchPlaceholder,
	emptyMessage = 'No results found',
	className = '',
	disabled = false,
	isClearable = false,
	onScrollEnd,
	scrollThreshold,
	isLoading,
	onSearchChange,
	searchValue,
	shouldFilter = true,
}: FormComboboxProps<T>) => {
	const formContext = useFormContext<T>();
	const resolvedControl = control || formContext?.control;

	if (!resolvedControl) {
		throw new Error(
			'FormCombobox requires either a control prop or to be nested within a FormProvider',
		);
	}

	const {
		field: { value, onChange },
	} = useController({
		name,
		control: resolvedControl,
	});

	const handleClear = () => onChange('');

	const canClear = isClearable && !disabled && Boolean(value);
	const selectedLabel = options.find((opt) => opt.value === value)?.label;

	return (
		<Combobox value={value ?? ''} onValueChange={onChange}>
			<ComboboxTrigger
				placeholder={placeholder}
				className={className}
				disabled={disabled}
				showClearButton={canClear}
				onClear={handleClear}
			>
				{selectedLabel}
			</ComboboxTrigger>
			<ComboboxContent
				searchPlaceholder={searchPlaceholder}
				onScrollEnd={onScrollEnd}
				scrollThreshold={scrollThreshold}
				isLoading={isLoading}
				shouldFilter={shouldFilter}
				onSearchChange={onSearchChange}
				searchValue={searchValue}
			>
				<ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
				<CommandGroup>
					{options.map((option) => (
						<ComboboxItem key={option.value} value={option.value}>
							{option.label}
						</ComboboxItem>
					))}
				</CommandGroup>
			</ComboboxContent>
		</Combobox>
	);
};
