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
	domain: string;
	userId: string;
	token: string;
}

export default function VerificationEmailTemplate({
	domain,
	userId,
	token,
}: VerificationEmailTemplateProps) {
	const url = `${domain}/email-verify?userId=${userId}&token=${token}`;

	return (
		<Html>
			<Head />
			<Preview>Confirm your email for SiteStatus</Preview>
			<Tailwind>
				<Body className="text-black text-center">
					<Heading className="text-center text-3xl">
						Welcome to SiteStatus
					</Heading>
					<Text className="text-center">
						Please confirm your email address to activate your account and start
						using our service. This helps us ensure the security of your data.
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
						This link will expire in 1 hour. If you did not request this email
						you can safely ignore it.
					</Text>
					<Text>Thanks, for using our service!</Text>
				</Body>
			</Tailwind>
		</Html>
	);
}
