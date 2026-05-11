import { Heading, Section, Text } from '@react-email/components';
import React from 'react';
import { IncidentAlertDto } from '../dto';
import { BaseEmailProps } from './base-email-props.types';
import { Button, Footer, Wrapper } from './components';

interface MonitorDownTemplateProps extends BaseEmailProps {
	incident: IncidentAlertDto;
}

const MonitorDownTemplate = ({
	iconUrl,
	url,
	incident,
}: MonitorDownTemplateProps) => {
	return (
		<Wrapper iconUrl={iconUrl} preview="Your monitor is DOWN">
			<Heading as="h2" className="text-left text-2xl text-white m-0">
				Your monitor is DOWN
			</Heading>
			<Section className="py-1 text-left">
				<Text className="font-base text-white m-0 mt-8 mb-1 leading-[24px]">
					We detected that your monitor '{incident.monitorName}' is DOWN
					{incident.regions &&
						incident.regions.length > 0 &&
						` in this
					following region(s): ${incident.regions.map((r) => r.name).join(', ')}`}
					.
				</Text>
				<Section>
					{incident.errorMessage && (
						<Text className="font-base text-white m-0 mt-0 mb-1 leading-[24px]">
							Error message: {incident.errorMessage}
						</Text>
					)}
				</Section>
				<Text className="font-base text-white m-0 mt-8 mb-3 leading-[24px]">
					Click the button below to view the incident details and take necessary
					actions.
				</Text>
				<Button href={url}>View Incident Details</Button>
				<Footer />
			</Section>
		</Wrapper>
	);
};

export default MonitorDownTemplate;
