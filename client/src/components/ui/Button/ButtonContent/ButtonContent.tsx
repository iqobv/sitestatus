'use client';

import Loader from '../../Loader/Loader';
import styles from './ButtonContent.module.scss';

interface ButtonContentProps {
	children: React.ReactNode;
	loading: boolean;
	className?: string;
}

const ButtonContent = ({
	children,
	loading,
	className,
}: ButtonContentProps) => {
	const classNames = [styles.inner, loading && styles.loading, className]
		.filter(Boolean)
		.join(' ')
		.trim();

	return (
		<div className={classNames}>
			<div className={styles.content}>{children}</div>
			{loading && (
				<Loader
					containerClassName={styles.loader}
					disablePadding
					thickness={4}
					size={22}
				/>
			)}
		</div>
	);
};

export default ButtonContent;
