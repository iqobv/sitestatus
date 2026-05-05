'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import Button from '../../../Button/Button';
import { useModalContext } from '../../ModalContext';
import styles from './ModalContent.module.scss';

const ModalContent = ({ children }: { children: ReactNode }) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState<boolean>(false);
	const { open, onClose } = useModalContext('Modal.Content');

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted && open && overlayRef.current) {
			overlayRef.current.focus();
		}
	}, [mounted, open]);

	useEffect(() => {
		if (!mounted || !open) {
			return;
		}

		const handleCloseOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		const handleCloseOnClickOutside = (event: MouseEvent) => {
			if (overlayRef.current && event.target === overlayRef.current) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleCloseOnEscape);
		document.addEventListener('mousedown', handleCloseOnClickOutside);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleCloseOnEscape);
			document.removeEventListener('mousedown', handleCloseOnClickOutside);
			document.body.style.overflow = 'auto';
		};
	}, [open, onClose, mounted]);

	if (!mounted) {
		return null;
	}

	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					className={styles.overlay}
					ref={overlayRef}
					tabIndex={-1}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1 }}
				>
					<motion.div
						className={styles.content}
						role="dialog"
						aria-modal="true"
						onClick={(e) => e.stopPropagation()}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
					>
						<Button
							onClick={onClose}
							variant="text"
							isIcon
							rounded
							size="sm"
							className={styles.closeButton}
						>
							<MdClose size={20} />
						</Button>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
};

export default ModalContent;
