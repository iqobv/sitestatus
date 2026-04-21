import { Logo } from '@/components/icons';
import { LogoProps } from '@/components/icons/Logo';
import Link from 'next/link';
import styles from './LogoLink.module.scss';

interface LogoLinkProps {
	href: string;
	logoProps?: LogoProps;
	className?: string;
	onClick?: () => void;
}

const LogoLink = ({ href, logoProps, className, onClick }: LogoLinkProps) => {
	return (
		<Link
			href={href}
			className={`${styles['logo']} ${className || ''}`}
			onClick={onClick}
		>
			<Logo
				width={logoProps?.width || 32}
				height={logoProps?.height || 32}
				{...logoProps}
			/>
			<span className={styles['logo__text']}>
				<span className={styles['logo__text--highlight']}>Site</span>
				Status
			</span>
		</Link>
	);
};

export default LogoLink;
