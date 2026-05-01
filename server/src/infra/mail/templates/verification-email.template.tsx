import { Heading, Section, Text } from '@react-email/components';
import React from 'react';
import { BaseEmailProps } from './base-email-props.types';
import { Button, Footer, Wrapper } from './components';

export default function VerificationEmailTemplate({
	url,
	iconUrl,
}: BaseEmailProps) {
	return (
		<Wrapper
			iconUrl={iconUrl}
			preview="Thanks for signing up! Please click the button below to verify your email address and complete your registration."
		>
			<Heading as="h2" className="text-left text-2xl text-white m-0">
				Verify Your Email
			</Heading>
			<Section className="py-1 text-left">
				<Text className="font-base text-white m-0 mt-8 mb-6 leading-[24px]">
					Thanks for signing up! Please click the button below to verify your
					email address and complete your registration.
				</Text>
				<Button href={url}>Verify Email</Button>
			</Section>
			<Footer expiresIn="24 hours" />
		</Wrapper>
	);
}
