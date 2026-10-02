'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import styles from './DropdownItem.module.scss';

export const DropdownItem = ({
	children,
	className,
	asChild = false,
	...props
}: DropdownMenu.DropdownMenuItemProps) => {
	return (
		<DropdownMenu.Item
			className={clsx(styles.item, className)}
			asChild={asChild}
			{...props}
		>
			{children}
		</DropdownMenu.Item>
	);
};
