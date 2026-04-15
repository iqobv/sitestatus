'use client';

import {
	FloatingFocusManager,
	FloatingList,
	FloatingPortal,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
	children: ReactNode;
	ariaLabel?: string;
}

const DropdownMenu = ({ children, ariaLabel }: DropdownMenuProps) => {
	const {
		isOpen,
		context,
		floatingStyles,
		setFloating,
		getFloatingProps,
		elementsRef,
		labelsRef,
	} = useDropdown();

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
								className={styles['dropdown-menu']}
								aria-label={ariaLabel}
								initial={{ opacity: 0, y: -8, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -8, scale: 0.95 }}
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
									{children}
								</FloatingList>
							</motion.div>
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			)}
		</AnimatePresence>
	);
};

export default DropdownMenu;
