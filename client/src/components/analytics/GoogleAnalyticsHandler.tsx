'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const GoogleAnalyticsHandler = () => {
	const gaId = process.env.NEXT_PUBLIC_GA_ID as string;

	return (
		<>
			<Script
				id="ga-consent-logic"
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            const getConsent = () => {
              const name = "SiteStatusConsent=";
              const ca = document.cookie.split(';');
              for(let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
              }
              return null;
            };

            const isGranted = getConsent() === 'true';

            gtag('consent', 'default', {
              'analytics_storage': isGranted ? 'granted' : 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
				}}
			/>

			<GoogleAnalytics gaId={gaId} />
		</>
	);
};

export default GoogleAnalyticsHandler;
