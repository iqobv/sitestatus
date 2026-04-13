'use client';

import Link from 'next/link';
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
	onClick = () => {},
	style,
	type = 'button',
	loading = false,
	size = 'md',
	fullWidth = false,
	isIcon = false,
	rounded = false,
	contentClassName = '',
	isActive,
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

	return (
		<>
			{isLink ? (
				<Link
					href={href}
					className={`${styles} ${className}`}
					style={style}
					id={id}
					onClick={onClick}
					{...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					<ButtonContent {...buttonContentProps}>{children}</ButtonContent>
				</Link>
			) : (
				<button
					className={`${styles} ${className}`}
					onClick={onClick}
					style={style}
					disabled={disabled || loading}
					type={type}
					id={id}
					{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
				>
					<ButtonContent {...buttonContentProps}>{children}</ButtonContent>
				</button>
			)}
		</>
	);
}
