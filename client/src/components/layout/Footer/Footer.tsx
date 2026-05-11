import { Logo } from '@/components/icons';
import { Sepator } from '@/components/ui';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import styles from './Footer.module.scss';
import { FOOTER_ITEMS } from './footerItems';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={'container'}>
				<div className={styles.content}>
					<div className={styles.brand}>
						<p className={styles.brandTitle}>
							<Logo width={24} height={24} />
							SiteStatus
						</p>
						<p className={styles.brandDescription}>
							Monitor your website&apos;s uptime and performance with ease.
						</p>
						<div className={styles.brandSocials}>
							<Link
								href={'https://github.com/iqobv'}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaGithub size={24} />
							</Link>
						</div>
					</div>
					<div className={styles.links}>
						{FOOTER_ITEMS.map((item) => (
							<div key={item.title} className={styles.link}>
								<p className={styles.linkTitle}>{item.title}</p>
								<div className={styles.linkItems}>
									{item.links.map((link) => (
										<Link
											className={styles.linkItem}
											key={link.label}
											href={link.href}
										>
											{link.label}
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<Sepator margin={20} />
				<p className={styles.copyright}>
					© {new Date().getFullYear()} SiteStatus. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
