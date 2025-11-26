'use client';

import styles from './TooltipArrow.module.scss';

interface TooltipArrowProps {
	left: number;
}

const TooltipArrow = ({ left }: TooltipArrowProps) => {
	return (
		<div
			style={{ left, transform: 'translateX(-50%)' }}
			className={styles['tooltip-arrow']}
		></div>
	);
};

export default TooltipArrow;
