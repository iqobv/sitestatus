'use client';

import { ReactNode } from 'react';
import styles from './ModalHeader.module.scss';

export const ModalHeader = ({ children }: { children: ReactNode }) => {
	return (
		<div className={styles.header}>
			<h2>{children}</h2>
		</div>
	);
};
