'use client';

import {
	arrow,
	autoUpdate,
	flip,
	offset,
	Placement,
	shift,
	useFloating,
	useHover,
	useInteractions,
	useRole,
} from '@floating-ui/react';
import { createContext, useContext, useRef, useState } from 'react';
import { TooltipContextType } from './TooltipContext.types';

interface TooltipProviderProps {
	children: React.ReactNode;
	placement?: Placement;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const useTooltip = (): TooltipContextType => {
	const context = useContext(TooltipContext);
	if (!context) {
		throw new Error('useTooltip must be used within a TooltipProvider');
	}
	return context;
};

const TooltipProvider = ({
	children,
	placement = 'top',
}: TooltipProviderProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const arrowRef = useRef<SVGSVGElement | null>(null);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(8),
			arrow({
				element: arrowRef,
			}),
			flip(),
			shift({ padding: 8 }),
		],
	});

	const hover = useHover(context);
	const role = useRole(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([
		hover,
		role,
	]);

	return (
		<TooltipContext.Provider
			value={{
				isOpen,
				setIsOpen,
				getReferenceProps,
				getFloatingProps,
				floatingStyles,
				setReference: refs.setReference,
				setFloating: refs.setFloating,
				context,
				arrowRef,
			}}
		>
			{children}
		</TooltipContext.Provider>
	);
};

export default TooltipProvider;
