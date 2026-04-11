'use client';

import { ReactNode } from 'react';
import styles from './ModalBody.module.scss';

interface ModalBodyProps {
	children: ReactNode;
	className?: string;
}

const ModalBody = ({ children, className }: ModalBodyProps) => {
	return (
		<div className={`${styles['modal__body']} ${className}`}>{children}</div>
	);
};

export default ModalBody;
