'use client';

import { Button } from '@/components/ui';
import { BREAKPOINTS } from '@/constants';
import { useEffect, useState } from 'react';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import styles from './Sidebar.module.scss';
import SidebarBody from './SidebarBody/SidebarBody';
import SidebarFooter from './SidebarFooter/SidebarFooter';
import SidebarHeader from './SidebarHeader/SidebarHeader';

const Sidebar = () => {
	const [expanded, setExpanded] = useState(false);
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		const xlBreakpoint = BREAKPOINTS.xl;

		const handleResize = () => {
			if (window.innerWidth >= xlBreakpoint) {
				setIsMobile(false);
			} else {
				setIsMobile(true);
			}
		};

		handleResize();

		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(document.body);

		return () => {
			resizeObserver.unobserve(document.body);
		};
	}, [setExpanded]);

	const handleClose = () => setExpanded((prev) => !prev);
	const handleClick = () => isMobile && handleClose();

	return (
		<>
			<div
				className={`${styles['sidebar__overlay']} ${expanded ? styles['sidebar__overlay--active'] : ''}`}
				onClick={handleClose}
			/>
			<aside
				className={`${styles['sidebar']} ${expanded ? styles['sidebar--expanded'] : ''}`}
			>
				<div className={styles['sidebar__content']}>
					<SidebarHeader onClick={handleClick} />
					<SidebarBody onClick={handleClick} />
					<SidebarFooter />
				</div>
			</aside>
			<div className={styles['sidebar__toggle-container']}>
				<Button
					className={styles['sidebar__toggle']}
					onClick={handleClose}
					isIcon
					variant="text"
					rounded
				>
					<TbLayoutSidebarRightCollapse
						size={24}
						className={`${styles['sidebar__toggle-icon']} ${expanded ? styles['sidebar__toggle-icon--expanded'] : ''}`}
					/>
				</Button>
			</div>
		</>
	);
};

export default Sidebar;
