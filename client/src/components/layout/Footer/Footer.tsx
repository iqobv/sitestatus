import { LogoLink, Sepator } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config/publicPages.config';
import Link from 'next/link';
import styles from './Footer.module.scss';
import { FOOTER_ITEMS } from './footerItems';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={'container'}>
				<div className={styles.content}>
					<div className={styles.brand}>
						<LogoLink
							href={PUBLIC_PAGES.HOME}
							logoProps={{
								width: 24,
								height: 24,
							}}
						/>
						<p className={styles.brandDescription}>
							Monitor your website&apos;s uptime and performance with ease.
						</p>
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
