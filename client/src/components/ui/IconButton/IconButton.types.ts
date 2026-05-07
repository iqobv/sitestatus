import { IconType } from 'react-icons';
import { ButtonBaseProps } from '../Button/Button.types';

export interface IconButtonProps {
	buttonProps?: Omit<ButtonBaseProps, 'children'>;
	href?: string;
	Icon: IconType;
	children: React.ReactNode;
}
