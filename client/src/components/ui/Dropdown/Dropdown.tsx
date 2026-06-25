'use client';

import {
	autoUpdate,
	flip,
	offset,
	Placement,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useListNavigation,
	useRole,
} from '@floating-ui/react';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { DropdownContext } from './DropdownContext';

interface DropdownProps {
	children: ReactNode;
	placement?: Placement;
	onClose?: () => void;
}

export const Dropdown = ({
	children,
	placement = 'bottom-start',
	onClose,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const elementsRef = useRef<Array<HTMLElement | null>>([]);
	const labelsRef = useRef<Array<string | null>>([]);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			setIsOpen(open);
			if (!open && onClose) {
				onClose();
			}
		},
		[onClose],
	);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: handleOpenChange,
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [offset(8), flip(), shift({ padding: 8 })],
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: 'menu' });
	const listNavigation = useListNavigation(context, {
		listRef: elementsRef,
		activeIndex,
		onNavigate: setActiveIndex,
		loop: true,
	});

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
		[click, dismiss, role, listNavigation],
	);

	const close = useCallback(() => {
		handleOpenChange(false);
		const referenceElement = refs.domReference.current;
		if (referenceElement instanceof HTMLElement) {
			referenceElement.focus();
		}
	}, [handleOpenChange, refs.domReference]);

	return (
		<DropdownContext.Provider
			value={{
				isOpen,
				setIsOpen,
				activeIndex,
				setActiveIndex,
				elementsRef,
				labelsRef,
				getReferenceProps,
				getFloatingProps,
				getItemProps,
				floatingStyles,
				setReference: refs.setReference,
				setFloating: refs.setFloating,
				refs,
				context,
				close,
			}}
		>
			{children}
		</DropdownContext.Provider>
	);
};
