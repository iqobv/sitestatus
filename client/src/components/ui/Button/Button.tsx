'use client';

import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './butonStyles';
import { ButtonProps } from './Button.types';
import ButtonContent from './ButtonContent/ButtonContent';

export default function Button({
	children,
	variant = 'contained',
	className = '',
	disabled = false,
	href = '',
	id,
	onClick,
	style,
	type = 'button',
	loading = false,
	size = 'md',
	fullWidth = false,
	isIcon = false,
	rounded = false,
	contentClassName = '',
	isActive,
	ref,
	...rest
}: ButtonProps) {
	const isLink = !!href && !disabled && !loading;

	const styles = buttonVariants({
		variant,
		size,
		fullWidth,
		isIcon,
		disabled,
		rounded,
	});

	const buttonContentProps = {
		loading,
		className: contentClassName,
	};

	if (isLink) {
		return (
			<Link
				href={href}
				className={`${styles} ${className || ''}`}
				style={style}
				id={id}
				onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
				ref={ref as React.Ref<HTMLAnchorElement>}
				{...(rest as Omit<
					React.AnchorHTMLAttributes<HTMLAnchorElement>,
					'href'
				>)}
			>
				<ButtonContent {...buttonContentProps}>{children}</ButtonContent>
			</Link>
		);
	}

	return (
		<button
			className={`${styles} ${className || ''}`}
			onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
			style={style}
			disabled={disabled || loading}
			type={type}
			id={id}
			ref={ref as React.Ref<HTMLButtonElement>}
			{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			<ButtonContent {...buttonContentProps}>{children}</ButtonContent>
		</button>
	);
}
