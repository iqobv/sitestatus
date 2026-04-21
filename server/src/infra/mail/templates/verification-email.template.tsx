import {
	Body,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Tailwind,
	Text,
} from '@react-email/components';
import React from 'react';

interface VerificationEmailTemplateProps {
	url: string;
}

export default function VerificationEmailTemplate({
	url,
}: VerificationEmailTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>Verify your email address</Preview>
			<Tailwind>
				<Body className="text-black text-center">
					<Heading className="text-center text-3xl">
						Welcome to SiteStatus
					</Heading>
					<Text className="text-center">
						Thank you for registering! Please click the button below to verify
						your email address and complete your registration.
					</Text>
					<Link
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							backgroundColor: '#9c9c9cff',
							color: '#000000ff',
							padding: '12px 24px',
							borderRadius: '8px',
							textDecoration: 'none',
							display: 'inline-block',
							fontWeight: 'bold',
							marginTop: '16px',
							textAlign: 'center',
						}}
					>
						Confirm Email
					</Link>
					<Text>
						If you did not request this email, you can safely ignore it. This
						link will expire in 24 hours.
					</Text>
					<Text>Thanks, for using our service!</Text>
				</Body>
			</Tailwind>
		</Html>
	);
}
