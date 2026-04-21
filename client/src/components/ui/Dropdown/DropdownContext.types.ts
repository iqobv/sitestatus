import { ExtendedRefs, FloatingContext } from '@floating-ui/react';
import { ReferenceType } from '@floating-ui/react-dom';
import { Dispatch, HTMLProps, RefObject, SetStateAction } from 'react';

export interface DropdownContextType {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	activeIndex: number | null;
	setActiveIndex: Dispatch<SetStateAction<number | null>>;
	elementsRef: RefObject<Array<HTMLElement | null>>;
	labelsRef: RefObject<Array<string | null>>;
	getReferenceProps: (
		userProps?: HTMLProps<Element>,
	) => Record<string, unknown>;
	getFloatingProps: (
		userProps?: HTMLProps<HTMLElement>,
	) => Record<string, unknown>;
	getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
	floatingStyles: React.CSSProperties;
	setReference: (node: ReferenceType | null) => void;
	setFloating: (node: HTMLElement | null) => void;
	context: FloatingContext;
	close: () => void;
	refs: ExtendedRefs<ReferenceType>;
}
