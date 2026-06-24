'use client';

import { ReactNode } from 'react';

interface ModalFooterProps {
	children: ReactNode;
	className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
	return <div className={className}>{children}</div>;
};
