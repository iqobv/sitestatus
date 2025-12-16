import { type ReactNode } from 'react';

export interface TooltipProps {
	targetRef: React.RefObject<HTMLElement | null>;
	children: ReactNode;
	className?: string;
}
