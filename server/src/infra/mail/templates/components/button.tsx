import { Button as REButton } from '@react-email/components';
import React from 'react';

interface ButtonProps extends React.ComponentProps<typeof REButton> {
	children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<REButton
			className={`bg-accent font-base font-semibold cursor-pointer text-bg dark:text-bg-dark inline-block px-[20px] py-[14px] text-left rounded-[4px] ${props.className ?? ''}`}
			{...props}
		>
			{children}
		</REButton>
	);
};

export default Button;
