'use client';

import { Button } from '@/components/ui';
import { Breakpoint } from '@/types/ui/breakpoint.types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import styles from './Sidebar.module.scss';
import { SidebarBody } from './SidebarBody/SidebarBody';
import { SidebarFooter } from './SidebarFooter/SidebarFooter';
import { SidebarHeader } from './SidebarHeader/SidebarHeader';

export const Sidebar = () => {
	const [expanded, setExpanded] = useState(false);
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		const xxlBreakpoint = Breakpoint.xxl;

		const handleResize = () => {
			window.innerWidth >= xxlBreakpoint
				? setIsMobile(false)
				: setIsMobile(true);
		};

		handleResize();

		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(document.body);

		return () => resizeObserver.unobserve(document.body);
	}, [setExpanded]);

	const handleClose = () => setExpanded((prev) => !prev);
	const handleClick = () => isMobile && handleClose();

	return (
		<>
			<div
				className={clsx(styles.overlay, expanded && styles.active)}
				onClick={handleClose}
			/>
			<aside className={clsx(styles.sidebar, expanded && styles.expanded)}>
				<div className={styles.content}>
					<SidebarHeader onClick={handleClick} />
					<SidebarBody onClick={handleClick} />
					<SidebarFooter onClick={handleClick} />
				</div>
			</aside>
			<div className={styles.toggleContainer}>
				<Button
					className={styles.toggle}
					onClick={handleClose}
					isIcon
					variant="text"
					isRounded
				>
					<TbLayoutSidebarRightCollapse
						size={24}
						className={clsx(styles.toggleIcon, expanded && styles.expanded)}
					/>
				</Button>
			</div>
		</>
	);
};
