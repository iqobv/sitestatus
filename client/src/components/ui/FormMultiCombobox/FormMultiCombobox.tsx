'use client';

import { CommandGroup } from 'cmdk';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { ComboboxEmpty } from '../Combobox/ComboboxEmpty/ComboboxEmpty';
import { MultiCombobox } from '../MultiCombobox/MultiCombobox';
import { MultiComboboxContent } from '../MultiCombobox/MultiComboboxContent/MultiComboboxContent';
import { MultiComboboxItem } from '../MultiCombobox/MultiComboboxItem/MultiComboboxItem';
import { MultiComboboxTrigger } from '../MultiCombobox/MultiComboboxTrigger/MultiComboboxTrigger';
import { FormMultiComboboxProps } from './FormMultiCombobox.types';

export const FormMultiCombobox = <T extends FieldValues>({
	name,
	control,
	options,
	placeholder,
	searchPlaceholder,
	emptyMessage = 'No results found',
	className = '',
	disabled = false,
	onScrollEnd,
	scrollThreshold,
	isLoading,
	onSearchChange,
	searchValue,
	shouldFilter = true,
	zIndex,
	menuWidth = 'max-content',
}: FormMultiComboboxProps<T>) => {
	const formContext = useFormContext<T>();
	const resolvedControl = control || formContext?.control;

	if (!resolvedControl) {
		throw new Error(
			'FormMultiCombobox requires either a control prop or to be nested within a FormProvider',
		);
	}

	const {
		field: { value, onChange },
	} = useController({
		name,
		control: resolvedControl,
	});

	const arrayValue = Array.isArray(value) ? value : [];

	return (
		<MultiCombobox values={arrayValue} onValuesChange={onChange}>
			<MultiComboboxTrigger
				placeholder={placeholder}
				className={className}
				disabled={disabled}
				options={options}
			/>
			<MultiComboboxContent
				searchPlaceholder={searchPlaceholder}
				onScrollEnd={onScrollEnd}
				scrollThreshold={scrollThreshold}
				isLoading={isLoading}
				shouldFilter={shouldFilter}
				onSearchChange={onSearchChange}
				searchValue={searchValue}
				width={menuWidth}
				style={{
					...(zIndex && { zIndex }),
				}}
			>
				<ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
				<CommandGroup>
					{options.map((option) => (
						<MultiComboboxItem key={option.value} value={option.value}>
							{option.label}
						</MultiComboboxItem>
					))}
				</CommandGroup>
			</MultiComboboxContent>
		</MultiCombobox>
	);
};
