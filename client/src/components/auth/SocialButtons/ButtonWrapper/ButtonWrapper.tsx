'use client';

import { Button } from '@/components/ui';
import styles from './ButtonWrapper.module.scss';

interface ButtonWrapperProps {
	children: React.ReactNode;
	onClick?: () => void;
}

const ButtonWrapper = ({ children, onClick }: ButtonWrapperProps) => {
	return (
		<Button
			className={styles['button-wrapper']}
			variant="outlined"
			onClick={onClick}
			fullWidth
		>
			{children}
		</Button>
	);
};

export default ButtonWrapper;
