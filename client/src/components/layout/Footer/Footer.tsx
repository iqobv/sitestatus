import { Logo } from '@/components/icons';
import { Sepator } from '@/components/ui';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import styles from './Footer.module.scss';
import { FOOTER_ITEMS } from './footerItems';

const Footer = () => {
	return (
		<footer className={styles['footer']}>
			<div className={'container'}>
				<div className={styles['footer__content']}>
					<div className={styles['footer__brand']}>
						<p className={styles['footer__brand-title']}>
							<Logo width={24} height={24} />
							SiteStatus
						</p>
						<p className={styles['footer__brand-description']}>
							Monitor your website&apos;s uptime and performance with ease.
						</p>
						<div className={styles['footer__brand-socials']}>
							<Link href={'https://github.com/iqobv'} target="_blank">
								<FaGithub size={24} />
							</Link>
						</div>
					</div>
					<div className={styles['footer__links']}>
						{FOOTER_ITEMS.map((item) => (
							<div key={item.title} className={styles['footer__link']}>
								<p className={styles['footer__link-title']}>{item.title}</p>
								<div className={styles['footer__link-items']}>
									{item.links.map((link) => (
										<Link
											className={styles['footer__link-item']}
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
				<p className={styles['footer__copyright']}>
					© {new Date().getFullYear()} SiteStatus. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
