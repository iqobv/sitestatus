import { cva } from 'class-variance-authority';

import styles from './TextField.module.scss';

export const textFieldVariants = cva(styles.textField, {
	variants: {
		fullWidth: {
			true: styles.fullWidth,
			false: null,
		},
		disabled: {
			true: styles.disabled,
			false: null,
		},
		error: {
			true: styles.error,
			false: null,
		},
		leftIcon: {
			true: styles.iconInputLeft,
			false: null,
		},
		rightIcon: {
			true: styles.iconInputRight,
			false: null,
		},
	},
	defaultVariants: {
		fullWidth: false,
		disabled: false,
		error: false,
		leftIcon: false,
		rightIcon: false,
	},
});
