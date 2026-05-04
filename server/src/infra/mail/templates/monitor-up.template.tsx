import { Heading, Section, Text } from '@react-email/components';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React from 'react';
import { IncidentAlertDto } from '../dto';
import { BaseEmailProps } from './base-email-props.types';
import { Button, Footer, Wrapper } from './components';

dayjs.extend(duration);

interface MonitorUpTemplateProps extends BaseEmailProps {
	incident: IncidentAlertDto;
}

const MonitorUpTemplate = ({
	iconUrl,
	url,
	incident,
}: MonitorUpTemplateProps) => {
	const downTime =
		(incident.resolvedAt &&
			new Date(incident.resolvedAt).getTime() -
				new Date(incident.createdAt).getTime()) ||
		0;

	const dur = dayjs.duration(downTime, 'milliseconds');
	const totalHours = Math.floor(dur.asHours());
	const minutes = dur.minutes();

	const result = totalHours > 0 ? `${totalHours}h ${minutes}m` : `${minutes}m`;

	return (
		<Wrapper iconUrl={iconUrl} preview="Your monitor is UP">
			<Heading as="h2" className="text-left text-2xl text-white m-0">
				Your monitor is UP
			</Heading>
			<Section className="py-1 text-left">
				<Text className="font-base text-white m-0 mt-8 mb-6 leading-[24px]">
					Your monitor '{incident.monitorName}' is back UP.
				</Text>
				<Section>
					{downTime > 0 && (
						<Text className="font-base text-white m-0 mt-0 mb-6 leading-[24px]">
							Downtime duration: {result}.
						</Text>
					)}
					{incident.errorMessage && (
						<Text className="font-base text-white m-0 mt-0 mb-6 leading-[24px]">
							Error message: {incident.errorMessage}
						</Text>
					)}
				</Section>
				<Text className="font-base text-white m-0 mt-8 mb-6 leading-[24px]">
					Click the button below to view the incident details and take necessary
					actions.
				</Text>
				<Button href={url}>View Incident Details</Button>
				<Footer />
			</Section>
		</Wrapper>
	);
};

export default MonitorUpTemplate;
