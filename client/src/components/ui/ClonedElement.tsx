'use client';

import React, { cloneElement, isValidElement, type ReactElement } from 'react';

interface ClonedElementProps {
	children: ReactElement;
	callback: () => void;
	elementRef?: (node: HTMLElement | null) => void;
}

const ClonedElement = ({
	children,
	callback,
	elementRef,
}: ClonedElementProps) => {
	if (!isValidElement(children)) {
		return null;
	}

	return cloneElement(children, {
		ref: (node: HTMLElement | null) => {
			elementRef?.(node);

			const { ref: originalRef } = children as { ref?: React.Ref<HTMLElement> };
			if (typeof originalRef === 'function') {
				originalRef(node);
			} else if (originalRef && 'current' in originalRef) {
				(originalRef as React.RefObject<HTMLElement | null>).current = node;
			}
		},
		onClick: (e: React.MouseEvent<HTMLElement>) => {
			const originalOnClick = (
				children.props as React.HTMLAttributes<HTMLElement>
			).onClick;
			originalOnClick?.(e);
			callback();
		},
	} as React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>);
};

export default ClonedElement;
