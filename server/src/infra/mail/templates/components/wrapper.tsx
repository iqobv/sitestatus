import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
} from '@react-email/components';
import React from 'react';
import { themeConfig } from '../theme';
import RobotoFonts from '../theme-fonts';
import Logo from './logo';

interface WrapperProps {
	children: React.ReactNode;
	iconUrl: string;
	preview: string;
	head?: React.ReactNode;
}

const Wrapper = ({ children, iconUrl, preview, head }: WrapperProps) => {
	return (
		<Tailwind config={themeConfig}>
			<Html>
				<Head>
					<RobotoFonts />
					<meta
						name="format-detection"
						content="telephone=no, date=no, address=no, email=no"
					/>
					<meta name="color-scheme" content="light dark" />
					<meta name="supported-color-schemes" content="light dark" />
					<style>
						{`
						a[x-apple-data-detectors] {
							color: inherit !important;
							text-decoration: none !important;
							font-size: inherit !important;
							font-family: inherit !important;
							font-weight: inherit !important;
							line-height: inherit !important;
						}

						.button-hover:hover {
							opacity: 0.9 !important;
							transition: opacity 0.2s ease-in-out;
						}

						u + #body a {
							color: inherit;
							text-decoration: none;
							font-size: inherit;
							font-family: inherit;
							font-weight: inherit;
							line-height: inherit;
						}
					`}
					</style>
					{head}
				</Head>
				<Body className="text-white font-sans">
					<Preview>{preview}</Preview>
					<Container className="mx-auto max-w-[640px] my-6 bg-bg-2 border-2 border-stroke rounded-[8px]">
						<Section className="mobile:px-4 px-6 py-6 text-left">
							<Logo logoUrl={iconUrl} />
							<Hr className="my-[16px] border-stroke border-t-2" />
							{children}
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
};

export default Wrapper;
