'use client';

import { useListItem, useMergeRefs } from '@floating-ui/react';
import React, {
	cloneElement,
	HTMLAttributes,
	isValidElement,
	ReactNode,
} from 'react';
import styles from './Dropdown.module.scss';
import { useDropdown } from './DropdownContext';

interface DropdownItemProps {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	asChild?: boolean;
	className?: string;
	closeOnClick?: boolean;
}

const DropdownItem = ({
	children,
	onClick,
	disabled = false,
	asChild = false,
	className = '',
	closeOnClick = true,
}: DropdownItemProps) => {
	const { getItemProps, close, activeIndex } = useDropdown();
	const { ref: listItemRef, index } = useListItem();

	const isActive = activeIndex === index;

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		if (disabled) {
			e.preventDefault();
			return;
		}
		if (onClick) {
			onClick();
		}
		if (closeOnClick) {
			close();
		}
	};

	const baseProps = getItemProps({
		className:
			`${styles['dropdown-item']} ${className} ${isActive ? styles['active'] : ''}`.trim(),
		role: 'menuitem',
		tabIndex: isActive ? 0 : -1,
		'aria-disabled': disabled,
		onClick: handleClick,
	}) as HTMLAttributes<HTMLElement>;

	if (asChild && isValidElement(children)) {
		const child = children as React.ReactElement<HTMLAttributes<HTMLElement>>;
		const childRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
		const mergedRef = useMergeRefs([listItemRef, childRef]);

		return cloneElement(child, {
			...baseProps,
			ref: mergedRef,
			className: [baseProps.className, child.props.className, className]
				.filter(Boolean)
				.join(' '),
			onClick: (e: React.MouseEvent<HTMLElement>) => {
				if (child.props.onClick) {
					child.props.onClick(e);
				}
				baseProps.onClick?.(e);
			},
		} as HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });
	}

	return (
		<button {...baseProps} ref={listItemRef} disabled={disabled} type="button">
			{children}
		</button>
	);
};

export default DropdownItem;
