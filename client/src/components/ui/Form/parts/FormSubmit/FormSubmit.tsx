'use client';

import Button from '@/components/ui/Button/Button';
import { ButtonBaseProps } from '@/components/ui/Button/Button.types';
import { useFormContext } from 'react-hook-form';

export type FormSubmitButtonProps = Omit<
	ButtonBaseProps,
	'type' | 'href' | 'children'
>;

interface FormSubmitProps {
	children: React.ReactNode;
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}

const FormSubmit = ({
	children,
	buttonProps,
	disabledOnEmpty = false,
}: FormSubmitProps) => {
	const {
		formState: { dirtyFields, isDirty },
	} = useFormContext();

	return (
		<Button
			type="submit"
			{...buttonProps}
			disabled={disabledOnEmpty && !isDirty}
		>
			{children}
		</Button>
	);
};

export default FormSubmit;
