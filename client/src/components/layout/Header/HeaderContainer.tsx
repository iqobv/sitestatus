'use client';

import styles from './HeaderContainer.module.scss';

interface HeaderContainerProps {
	children: React.ReactNode;
	containerClassName?: string;
}

const HeaderContainer = ({
	children,
	containerClassName,
}: HeaderContainerProps) => {
	return (
		<header className={styles['header']}>
			<div
				className={`${styles['header__content']} ${containerClassName} container`}
			>
				{children}
			</div>
		</header>
	);
};

export default HeaderContainer;
