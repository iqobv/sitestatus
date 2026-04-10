import { FloatingContext } from '@floating-ui/react';
import { ReferenceType } from '@floating-ui/react-dom';
import React, { Dispatch, HTMLProps, RefObject, SetStateAction } from 'react';

export interface TooltipContextType {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	getReferenceProps: (
		userProps?: HTMLProps<Element>,
	) => Record<string, unknown>;
	getFloatingProps: (
		userProps?: HTMLProps<HTMLElement>,
	) => Record<string, unknown>;
	floatingStyles: React.CSSProperties;
	setReference: (node: ReferenceType | null) => void;
	setFloating: (node: HTMLElement | null) => void;
	context: FloatingContext;
	arrowRef: RefObject<SVGSVGElement | null>;
}
