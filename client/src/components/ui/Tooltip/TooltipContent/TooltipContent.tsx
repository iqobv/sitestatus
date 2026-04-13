'use client';

import {
	FloatingArrow,
	FloatingFocusManager,
	FloatingPortal,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTooltip } from '../TooltipContext';
import styles from './TooltipContent.module.scss';

interface TooltipContentProps {
	children: React.ReactNode;
	className?: string;
}

const TooltipContent = ({ children, className }: TooltipContentProps) => {
	const {
		isOpen,
		arrowRef,
		context,
		setFloating,
		floatingStyles,
		getFloatingProps,
	} = useTooltip();

	return (
		<AnimatePresence>
			{isOpen && (
				<FloatingPortal>
					<FloatingFocusManager
						context={context}
						modal={false}
						initialFocus={-1}
					>
						<div
							ref={setFloating}
							style={{ ...floatingStyles, zIndex: 1000 }}
							{...getFloatingProps()}
						>
							<motion.div
								className={`${styles['tooltip']} ${className}`}
								initial={{ opacity: 0, y: -8, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -8, scale: 0.95 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								{children}
								<FloatingArrow
									ref={arrowRef}
									context={context}
									fill="var(--tooltip-border)"
									
								/>
							</motion.div>
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			)}
		</AnimatePresence>
	);
};

export default TooltipContent;
