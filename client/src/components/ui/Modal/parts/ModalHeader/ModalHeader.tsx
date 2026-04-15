'use client';

import { ReactNode } from 'react';
import styles from './ModalHeader.module.scss';

const ModalHeader = ({ children }: { children: ReactNode }) => {
	return (
		<div className={styles['modal__header']}>
			<h2>{children}</h2>
		</div>
	);
};

export default ModalHeader;
