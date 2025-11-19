import { UseFormRegisterReturn } from 'react-hook-form';

export interface TextFieldProps extends React.ComponentProps<'input'> {
	className?: string;
	disabled?: boolean;
	fullWidth?: boolean;
	register?: UseFormRegisterReturn;
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerClassName?: string;
	leftIconClassName?: string;
	rightIconClassName?: string;
}
