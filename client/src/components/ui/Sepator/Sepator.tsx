import React from 'react';
import styles from './Sepator.module.scss';
import { SepatorProps } from './Sepator.types';

const Sepator = ({
	orientation = 'horizontal',
	thickness = 1,
	margin = 0,
}: SepatorProps) => {
	return (
		<div
			style={
				{
					'--sepator-width':
						orientation === 'horizontal' ? '100%' : `${thickness}px`,
					'--sepator-height':
						orientation === 'horizontal' ? `${thickness}px` : '100%',
					'--sepator-margin': `${margin}px`,
				} as React.CSSProperties
			}
			className={styles['sepator']}
		/>
	);
};

export default Sepator;
