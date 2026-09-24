import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './buttonVariants';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
	extends
		Omit<React.ComponentPropsWithRef<'button'>, 'color'>,
		Omit<ButtonVariants, 'disabled'> {
	children: React.ReactNode;
	asChild?: boolean;
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement>;
}
