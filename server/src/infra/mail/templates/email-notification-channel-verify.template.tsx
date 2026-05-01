import { Heading, Section, Text } from '@react-email/components';
import React from 'react';
import { BaseEmailProps } from './base-email-props.types';
import { Button, Footer, Wrapper } from './components';

const EmailNotificationChannelVerifyTemplate = ({
	url,
	iconUrl,
}: BaseEmailProps) => {
	return (
		<Wrapper
			iconUrl={iconUrl}
			preview="We received a request to verify your email address to create a new notification channel."
		>
			<Heading as="h2" className="text-left text-2xl text-white m-0">
				Verify Your Email Address
			</Heading>
			<Section className="py-1 text-left">
				<Text className="font-base text-white m-0 mt-8 mb-6 leading-[24px]">
					We received a request to verify your email address to create a new
					notification channel. Click the button below to verify your email.
				</Text>
				<Button href={url}>Verify Email</Button>
			</Section>
			<Footer expiresIn="24 hours" />
		</Wrapper>
	);
};

export default EmailNotificationChannelVerifyTemplate;
