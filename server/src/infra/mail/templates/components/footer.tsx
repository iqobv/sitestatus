import { Section, Text } from '@react-email/components';
import React from 'react';

interface FooterProps {
	expiresIn?: string;
}

const Footer = ({ expiresIn }: FooterProps) => {
	return (
		<Section>
			<Text className="font-base text-fg-2 mt-8 mb-2 leading-[24px]">
				If you did not request this email, you can safely ignore it. This link
				will expire in {expiresIn}.
			</Text>
			<Text className="font-base text-fg-2 m-0 leading-[24px]">
				Thanks for using SiteStatus!
			</Text>
		</Section>
	);
};

export default Footer;
