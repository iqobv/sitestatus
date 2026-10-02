import { Logo, LogoProps } from '@/components/icons/Logo';
import clsx from 'clsx';
import styles from './LogoLink.module.scss';

interface LogoLinkProps {
	href: string;
	logoProps?: LogoProps;
	className?: string;
	onClick?: () => void;
}

export const LogoLink = ({
	href,
	logoProps,
	className,
	onClick,
}: LogoLinkProps) => {
	return (
		<a href={href} className={clsx(styles.logo, className)} onClick={onClick}>
			<Logo
				width={logoProps?.width || 32}
				height={logoProps?.height || 32}
				{...logoProps}
			/>
			<span className={styles.text}>
				<span className={styles.highlight}>Site</span>
				Status
			</span>
		</a>
	);
};
