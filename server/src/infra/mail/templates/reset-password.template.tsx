import { Heading, Section, Text } from '@react-email/components';
import React from 'react';
import { BaseEmailProps } from './base-email-props.types';
import { Button, Wrapper } from './components';

export default function ResetPasswordTemplate({
	url,
	iconUrl,
}: BaseEmailProps) {
	return (
		<Wrapper
			iconUrl={iconUrl}
			preview="We received a request to reset your password. Click the button below to reset your password."
		>
			<Heading as="h2" className="text-left text-2xl text-white m-0">
				Reset Your Password
			</Heading>
			<Section className="py-1 text-left">
				<Text className="font-base text-white m-0 mt-8 mb-6 leading-[24px]">
					We received a request to reset your password. Click the button below
					to reset your password.
				</Text>
				<Button href={url}>Reset Password</Button>
			</Section>
			<Text className="font-base text-white mt-8 mb-2 leading-[24px]">
				If you did not request this email, you can safely ignore it. This link
				will expire in 1 hour.
			</Text>
			<Text className="font-base text-white m-0 leading-[24px]">
				Thanks, for using our service!
			</Text>
		</Wrapper>
	);
}
