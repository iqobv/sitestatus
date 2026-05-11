import { cva } from 'class-variance-authority';

import baseStyles from './styles/Button.module.scss';
import buttonProperties from './styles/ButtonProperties.module.scss';
import sizeStyles from './styles/ButtonSize.module.scss';
import variantStyles from './styles/ButtonVariant.module.scss';

export const buttonVariants = cva(baseStyles.button, {
	variants: {
		variant: {
			contained: variantStyles.contained,
			outlined: variantStyles.outlined,
			text: variantStyles.text,
			link: variantStyles.link,
			secondary: variantStyles.secondary,
			danger: variantStyles.danger,
		},
		size: {
			sm: sizeStyles.sm,
			md: sizeStyles.md,
			lg: sizeStyles.lg,
		},
		fullWidth: {
			false: null,
			true: buttonProperties.fullWidth,
		},
		isIcon: {
			false: null,
			true: buttonProperties.icon,
		},
		disabled: {
			false: null,
			true: buttonProperties.disabled,
		},
		rounded: {
			false: null,
			true: buttonProperties.rounded,
		},
	},
	compoundVariants: [
		{ isIcon: false, size: 'sm', className: sizeStyles.paddingSm },
		{ isIcon: false, size: 'md', className: sizeStyles.paddingMd },
		{ isIcon: false, size: 'lg', className: sizeStyles.paddingLg },
		{ isIcon: true, size: 'sm', className: sizeStyles.iconPaddingSm },
		{ isIcon: true, size: 'md', className: sizeStyles.iconPaddingMd },
		{ isIcon: true, size: 'lg', className: sizeStyles.iconPaddingLg },
	],
	defaultVariants: {
		variant: 'contained',
		size: 'md',
		fullWidth: false,
		isIcon: false,
		disabled: false,
	},
});
