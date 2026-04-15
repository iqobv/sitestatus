'use client';

import React, { cloneElement, HTMLAttributes, ReactElement } from 'react';
import { useDropdown } from './DropdownContext';

import { useMergeRefs } from '@floating-ui/react';

interface DropdownTriggerProps {
	children: ReactElement<
		HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
	>;
}

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
	const { getReferenceProps, setReference, isOpen } = useDropdown();

	const childrenRef = (children as unknown as { ref?: React.Ref<HTMLElement> })
		.ref;
	const ref = useMergeRefs([setReference, childrenRef]);

	const referenceProps = getReferenceProps({
		ref,
		...children.props,
	});

	return cloneElement(children, {
		...referenceProps,
		'data-state': isOpen ? 'open' : 'closed',
	} as unknown as HTMLAttributes<HTMLElement> & {
		ref: React.Ref<HTMLElement>;
	});
};

export default DropdownTrigger;
