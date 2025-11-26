'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.scss';
import { TooltipProps } from './Tooltip.types';
import TooltipArrow from './TooltipArrow/TooltipArrow';

const Tooltip = ({ children, targetRef, className }: TooltipProps) => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [tooltipPosition, setTooltipPosition] = useState({
		top: -9999,
		left: -9999,
	});
	const [arrowLeft, setArrowLeft] = useState(0);

	useLayoutEffect(() => {
		if (targetRef.current && tooltipRef.current) {
			const targetRect = targetRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();

			const top = targetRect.top - tooltipRect.height - 16 + window.scrollY;
			let left =
				targetRect.left +
				(targetRect.width - tooltipRect.width) / 2 +
				window.scrollX;

			if (left < 16) {
				left = 16;
			} else if (left + tooltipRect.width > window.innerWidth - 16) {
				left = window.innerWidth - tooltipRect.width - 16;
			}

			const targetCenterX =
				targetRect.left + targetRect.width / 2 + window.scrollX;
			const arrowOffset = targetCenterX - left;

			setTooltipPosition({ top, left });
			setArrowLeft(arrowOffset);
		}
	}, [targetRef]);

	return (
		<div
			className={`${styles['tooltip']} ${className ? className : ''}`}
			ref={tooltipRef}
			style={{
				top: tooltipPosition.top,
				left: tooltipPosition.left,
			}}
		>
			{children}
			<TooltipArrow left={arrowLeft} />
		</div>
	);
};

export default Tooltip;
