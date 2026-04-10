'use client';

import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, HTMLAttributes, ReactElement } from 'react';
import { useTooltip } from '../TooltipContext';

interface TooltipTriggerProps {
	children: ReactElement<
		HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
	>;
}

const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
	const { setReference, getReferenceProps } = useTooltip();

	const childrenRef = (children as unknown as { ref?: React.Ref<HTMLElement> })
		.ref;
	const ref = useMergeRefs([setReference, childrenRef]);

	const referenceProps = getReferenceProps({
		ref,
		...children.props,
	});

	return cloneElement(children, {
		...referenceProps,
	} as unknown as HTMLAttributes<HTMLElement> & {
		ref: React.Ref<HTMLElement>;
	});
};

export default TooltipTrigger;
