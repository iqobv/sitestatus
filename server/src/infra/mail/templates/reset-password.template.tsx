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

interface ResetPasswordTemplateProps {
	url: string;
}

export default function ResetPasswordTemplate({
	url,
}: ResetPasswordTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>Reset your password</Preview>
			<Tailwind>
				<Body className="text-black text-center">
					<Heading className="text-center text-3xl">
						Reset Your Password
					</Heading>
					<Text className="text-center">
						We received a request to reset your password. Click the button below
						to choose a new one.
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
						Reset Password
					</Link>
					<Text>
						If you did not request this, you can safely ignore this email. The
						link will expire in 1 hour.
					</Text>
					<Text>Thanks, for using our service!</Text>
				</Body>
			</Tailwind>
		</Html>
	);
}
