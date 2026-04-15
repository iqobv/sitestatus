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
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { DropdownContextType } from './DropdownContenxt.types';

const DropdownContext = createContext<DropdownContextType | undefined>(
	undefined,
);

export const useDropdown = (): DropdownContextType => {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('useDropdown must be used within a DropdownProvider');
	}
	return context;
};

interface DropdownProviderProps {
	children: ReactNode;
	placement?: Placement;
}

const DropdownProvider = ({
	children,
	placement = 'bottom-start',
}: DropdownProviderProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const elementsRef = React.useRef<Array<HTMLElement | null>>([]);
	const labelsRef = React.useRef<Array<string | null>>([]);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
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

	const close = React.useCallback(() => {
		setIsOpen(false);
		const referenceElement = refs.domReference.current;
		if (referenceElement instanceof HTMLElement) {
			referenceElement.focus();
		}
	}, [refs.domReference]);

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
				context,
				close,
			}}
		>
			{children}
		</DropdownContext.Provider>
	);
};

export default DropdownProvider;
