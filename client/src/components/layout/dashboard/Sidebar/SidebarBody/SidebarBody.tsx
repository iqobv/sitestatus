'use client';

import SidebarLinks from '../SidebarLinks/SidebarLinks';
import styles from './SidebarBody.module.scss';

interface SidebarBodyProps {
	onClick: () => void;
}

const SidebarBody = ({ onClick }: SidebarBodyProps) => {
	return (
		<div className={styles.body}>
			<SidebarLinks onClick={onClick} />
		</div>
	);
};

export default SidebarBody;
