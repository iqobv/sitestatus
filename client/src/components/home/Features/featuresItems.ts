import { IconType } from 'react-icons';
import {
	MdOutlineLocationOn,
	MdOutlineNotifications,
	MdOutlineTextSnippet,
} from 'react-icons/md';

export interface FeatureItem {
	title: string;
	description: string;
	icon: IconType;
}

export const FEATURES: FeatureItem[] = [
	{
		title: 'Real-time Monitoring',
		description:
			'Get instant updates on the status of your services with real-time monitoring and alerts.',
		icon: MdOutlineNotifications,
	},
	{
		title: 'Multi-Location Checks',
		description:
			'Ensure your services are accessible worldwide with checks from multiple locations.',
		icon: MdOutlineLocationOn,
	},
	{
		title: 'Public Status Pages',
		description:
			'Keep your users informed with customizable public status pages for transparency.',
		icon: MdOutlineTextSnippet,
	},
];
