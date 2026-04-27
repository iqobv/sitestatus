import { LogoLink } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import Link from 'next/link';
import styles from './PublicPageFooter.module.scss';
import { PUBLIC_PAGE_FOOTER_LINKS } from './publicPageFooterlinks';

const PublicPageFooter = () => {
	return (
		<div className={`${styles.footer} container`}>
			<div className={styles.content}>
				<div className={styles.poweredBy}>
					<span>Powered by</span>
					<LogoLink
						href={PUBLIC_PAGES.HOME}
						logoProps={{
							width: 24,
							height: 24,
						}}
						className={styles.logo}
					/>
				</div>
				<div className={styles.links}>
					{PUBLIC_PAGE_FOOTER_LINKS.map((link, index) => (
						<Link key={index} href={link.href} className={styles.link}>
							{link.label}
						</Link>
					))}
				</div>
			</div>
			<p className={styles.copyright}>
				© {new Date().getFullYear()} SiteStatus. All rights reserved.
			</p>
		</div>
	);
};

export default PublicPageFooter;
