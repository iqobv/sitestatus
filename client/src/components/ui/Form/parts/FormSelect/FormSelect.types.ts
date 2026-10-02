import { SelectContentProps } from '@/components/ui/Select/Select.types';
import { CSSProperties, ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormSelectProps<T extends FieldValues> extends Pick<
	SelectContentProps,
	'scrollThreshold' | 'onScrollEnd' | 'width'
> {
	name: Path<T>;
	control?: Control<T>;
	children: ReactNode;
	placeholder?: string;
	className?: string;
	id?: string;
	style?: CSSProperties;
	disabled?: boolean;
	isClearable?: boolean;
	zIndex?: number;
}
