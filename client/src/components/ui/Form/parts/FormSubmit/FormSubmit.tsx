'use client';

import Button from '@/components/ui/Button/Button';
import { ButtonBaseProps } from '@/components/ui/Button/Button.types';
import React, { ComponentPropsWithRef } from 'react';
import { useFormContext } from 'react-hook-form';

export type FormSubmitButtonProps = Omit<
	ButtonBaseProps,
	'type' | 'href' | 'children'
>;

export interface FormSubmitProps extends ComponentPropsWithRef<'button'> {
	buttonProps?: FormSubmitButtonProps;
	disabledOnEmpty?: boolean;
}

const FormSubmit = ({
	children,
	buttonProps,
	disabledOnEmpty = false,
	onClick: injectedOnClick,
	ref,
	...props
}: FormSubmitProps) => {
	const {
		formState: { isDirty },
	} = useFormContext();

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
	) => {
		if (buttonProps?.onClick) {
			buttonProps.onClick(
				e as unknown as React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
			);
		}
		if (injectedOnClick) {
			if (e.currentTarget instanceof HTMLButtonElement) {
				injectedOnClick(e as React.MouseEvent<HTMLButtonElement>);
			}
		}
	};

	return (
		<Button
			type="submit"
			{...buttonProps}
			disabled={disabledOnEmpty && !isDirty}
			onClick={handleClick}
			ref={ref}
			{...props}
		>
			{children}
		</Button>
	);
};

export default FormSubmit;
