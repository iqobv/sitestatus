import styles from './HeaderContainer.module.scss';

interface HeaderContainerProps {
	children: React.ReactNode;
	headerClassName?: string;
	containerClassName?: string;
}

const HeaderContainer = ({
	children,
	headerClassName,
	containerClassName,
}: HeaderContainerProps) => {
	return (
		<header className={`${styles['header']} ${headerClassName}`}>
			<div
				className={`${styles['header__content']} ${containerClassName} container`}
			>
				{children}
			</div>
		</header>
	);
};

export default HeaderContainer;
