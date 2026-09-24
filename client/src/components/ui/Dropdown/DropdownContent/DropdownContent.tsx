'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropdownContext } from '../DropdownContext';
import styles from './DropdownContent.module.scss';

interface DropdownContentProps extends DropdownMenu.DropdownMenuContentProps {
	children: React.ReactNode;
	menuWidth?: 'auto' | 'fit-content' | 'max-content' | 'trigger';
}

export const DropdownContent = ({
	children,
	side = 'bottom',
	align = 'start',
	sideOffset = 4,
	className = '',
	menuWidth = 'auto',
	collisionPadding = 12,
	style,
	...props
}: DropdownContentProps) => {
	const { isOpen } = useDropdownContext();

	const resolvedWidth =
		style?.width || menuWidth === 'trigger'
			? 'var(--radix-dropdown-menu-trigger-width)'
			: menuWidth;

	return (
		<DropdownMenu.Portal forceMount>
			<AnimatePresence>
				{isOpen && (
					<DropdownMenu.Content
						asChild
						forceMount
						side={side}
						align={align}
						sideOffset={sideOffset}
						collisionPadding={collisionPadding}
						className={clsx(styles.content, className)}
						{...props}
					>
						<motion.div
							style={{
								...style,
								width: resolvedWidth,
							}}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.15, ease: 'easeOut' }}
						>
							{children}
						</motion.div>
					</DropdownMenu.Content>
				)}
			</AnimatePresence>
		</DropdownMenu.Portal>
	);
};
