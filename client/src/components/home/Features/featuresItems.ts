import { IconType } from 'react-icons';
import { MdOutlineLockOpen, MdOutlinePublic, MdOutlineTimeline, MdOutlineWeb } from 'react-icons/md';

export interface FeatureItem {
	title: string;
	description: string;
	icon: IconType;
}

export const FEATURES: FeatureItem[] = [
	{
		title: 'Multi-Region Network',
		description:
			'Global check nodes verifying your latency and availability from diverse internet exchanges.',
		icon: MdOutlinePublic,
	},
	{
		title: 'Public Status Pages',
		description:
			'Provide a public page where your users can easily check the real-time operational status and uptime history of your services.',
		icon: MdOutlineWeb,
	},
	{
		title: 'Granular History',
		description:
			'Archive every ping, response time, and latency shift for deep forensic analysis.',
		icon: MdOutlineTimeline,
	},
	{
		title: 'Forever Free',
		description:
			'Standard monitoring is not a luxury. Our core platform remains free for individual developers.',
		icon: MdOutlineLockOpen,
	},
];
// export const FEATURES: FeatureItem[] = [
// 	{
// 		title: 'Real-time Monitoring',
// 		description:
// 			'Get instant updates on the status of your services with real-time monitoring and alerts.',
// 		icon: MdOutlineNotifications,
// 	},
// 	{
// 		title: 'Multi-Location Checks',
// 		description:
// 			'Ensure your services are accessible worldwide with checks from multiple locations.',
// 		icon: MdOutlineLocationOn,
// 	},
// 	{
// 		title: 'Public Status Pages',
// 		description:
// 			'Keep your users informed with customizable public status pages for transparency.',
// 		icon: MdOutlineTextSnippet,
// 	},
// ];
