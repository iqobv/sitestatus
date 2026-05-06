'use client';

import { IncidentDetails, Region } from '@/types';

interface UseTransformDataProps {
	incidentData: IncidentDetails;
	regionsData: Region[];
}

export const useTransformData = ({
	incidentData,
	regionsData,
}: UseTransformDataProps) => {
	const transformRegionName = (regionId: string) =>
		regionsData.find((r) => r.id === regionId)?.name || 'Unknown';

	const transformErrorMessage = () =>
		`${incidentData.statusCode || 'Unknown status'} ${incidentData.errorMessage || 'Unknown error'}`;

	return {
		transformRegionName,
		transformErrorMessage,
	};
};
