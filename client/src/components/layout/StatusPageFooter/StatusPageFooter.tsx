import { LogoLink } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import Link from 'next/link';
import styles from './StatusPageFooter.module.scss';
import { STATUS_PAGE_FOOTER_LINKS } from './statusPageFooterlinks';

const StatusPageFooter = () => {
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
					{STATUS_PAGE_FOOTER_LINKS.map((link, index) => (
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

export default StatusPageFooter;
