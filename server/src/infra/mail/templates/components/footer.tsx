import { Link, Section, Text } from '@react-email/components';
import React from 'react';
import Divider from './divider';

interface FooterProps {
	expiresIn?: string;
}

const Footer = ({ expiresIn }: FooterProps) => {
	return (
		<Section className="py-1 font-[14px]">
			{expiresIn && (
				<Text className="font-base text-fg-2 mt-8 mb-2 leading-[24px]">
					If you did not request this email, you can safely ignore it. This link
					will expire in {expiresIn}.
				</Text>
			)}
			<Divider />
			<Section className="py-2">
				<Text className="font-base text-fg-2 m-0 leading-[24px]">
					Thank you for using SiteStatus!
					<br />
					The SiteStatus Team
					<br />
					<Link
						href="https://sitestatus.dev"
						className="text-primary underline no-underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						sitestatus.dev
					</Link>
					<br />
					<Link
						href="mailto:support@sitestatus.dev"
						className="text-primary underline no-underline"
					>
						support@sitestatus.dev
					</Link>
				</Text>
			</Section>
		</Section>
	);
};

export default Footer;
