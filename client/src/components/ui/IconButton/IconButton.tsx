import clsx from 'clsx';
import Link from 'next/link';
import { Button } from '../Button/Button';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './IconButton.types';

export const IconButton = ({
	buttonProps,
	Icon,
	href,
	children,
}: IconButtonProps) => {
	const Content = (
		<>
			<Icon size={20} />
			<div className={styles.text}>{children}</div>
		</>
	);

	return (
		<Button
			className={clsx(styles.button, buttonProps?.className)}
			asChild={!!href}
			{...buttonProps}
		>
			{href ? <Link href={href}>{Content}</Link> : Content}
		</Button>
	);
};
