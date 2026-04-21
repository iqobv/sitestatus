'use client';

import Button from '@/components/ui/Button/Button';
import { useFormContext } from 'react-hook-form';
import { FormSubmitButtonProps } from '../FormSubmit/FormSubmit';

interface FormResetProps {
	children: React.ReactNode;
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}

const FormReset = ({
	children,
	buttonProps,
	disabledOnEmpty = false,
}: FormResetProps) => {
	const {
		reset,
		formState: { isDirty },
	} = useFormContext();
	const { onClick: buttonPropsOnClick, ...rest } = buttonProps || {};

	const onClick = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
	) => {
		reset();
		if (buttonPropsOnClick) buttonPropsOnClick(e);
	};

	return (
		<Button
			type="button"
			onClick={onClick}
			disabled={disabledOnEmpty && !isDirty}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default FormReset;
