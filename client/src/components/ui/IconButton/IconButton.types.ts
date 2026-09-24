import { IconType } from 'react-icons';
import { ButtonProps } from '../Button/Button.types';

export interface IconButtonProps {
	buttonProps?: Omit<ButtonProps, 'children'>;
	href?: string;
	Icon: IconType;
	children: React.ReactNode;
}
