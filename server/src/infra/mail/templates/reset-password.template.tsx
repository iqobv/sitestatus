import { Heading, Section, Text } from '@react-email/components';
import React from 'react';
import { BaseEmailProps } from './base-email-props.types';
import { Button, Footer, Wrapper } from './components';

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
			<Footer expiresIn="1 hour" />
		</Wrapper>
	);
}
