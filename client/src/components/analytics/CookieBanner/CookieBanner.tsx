'use client';

import { LEGAL_PAGES } from '@/config';
import CookieConsent from 'react-cookie-consent';
import styles from './CookieBanner.module.scss';

const CookieBanner = () => {
	const handleConsentUpdate = (isGranted: boolean) => {
		if (typeof window.gtag === 'function') {
			window.gtag('consent', 'update', {
				analytics_storage: isGranted ? 'granted' : 'denied',
			});
		}
	};

	return (
		<CookieConsent
			location="bottom"
			buttonText="Accept All"
			declineButtonText="Decline"
			enableDeclineButton
			cookieName="SiteStatusConsent"
			containerClasses={styles.bannerContainer}
			buttonClasses={styles.acceptButton}
			declineButtonClasses={styles.declineButton}
			onAccept={() => handleConsentUpdate(true)}
			onDecline={() => handleConsentUpdate(false)}
			buttonWrapperClasses={styles.buttonWrapper}
			expires={365}
		>
			<div className={styles.content}>
				<h2>We use cookies</h2>
				<p>
					We use cookies to improve <strong>SiteStatus</strong> monitoring
					accuracy and analyze traffic. See our{' '}
					<a href={LEGAL_PAGES.COOKIE_POLICY}>Cookie Policy</a> for details.
				</p>
			</div>
		</CookieConsent>
	);
};

export default CookieBanner;
