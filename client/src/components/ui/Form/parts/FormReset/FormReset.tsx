'use client';

import Button from '@/components/ui/Button/Button';
import React, { ComponentPropsWithRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormSubmitButtonProps } from '../FormSubmit/FormSubmit';

export interface FormResetProps extends ComponentPropsWithRef<'button'> {
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}

const FormReset = ({
	children,
	buttonProps,
	disabledOnEmpty = false,
	onClick: injectedOnClick,
	ref,
	...props
}: FormResetProps) => {
	const {
		reset,
		formState: { isDirty },
	} = useFormContext();
	const { onClick: buttonPropsOnClick, ...rest } = buttonProps || {};

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
	) => {
		reset();
		if (buttonPropsOnClick) {
			buttonPropsOnClick(
				e as React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
			);
		}
		if (injectedOnClick) {
			injectedOnClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
		}
	};

	return (
		<Button
			type="button"
			onClick={handleClick}
			disabled={disabledOnEmpty && !isDirty}
			ref={ref}
			{...rest}
			{...props}
		>
			{children}
		</Button>
	);
};

export default FormReset;
