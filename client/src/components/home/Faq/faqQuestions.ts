import { AccordionItemProps } from '@/components/ui';

export interface FaqQuestion {
	question: string;
	answer: string;
}

export const FAQ_QUESTIONS: AccordionItemProps[] = [
	{
		title: 'What is SiteStatus?',
		content:
			'SiteStatus is a service that helps you monitor the availability and performance of your websites and online services. It provides real-time alerts and detailed reports to ensure your online presence is always up and running.',
	},
	{
		title: 'Is there a free?',
		content:
			'Yes, SiteStatus is a free service that allows you to monitor your websites and services without any cost. You can sign up and start using it right away.',
	},
	{
		title: 'How does the monitoring work?',
		content:
			'SiteStatus continuously checks your websites and services at regular intervals. It monitors various parameters such as uptime, response time, and performance metrics to ensure everything is functioning properly.',
	},
	{
		title: 'What types of alerts does SiteStatus provide?',
		content:
			'SiteStatus provides instant alerts via email when your website or service goes down or experiences performance issues.',
	},
	{
		title: 'Can I customize the monitoring intervals?',
		content:
			'Yes, SiteStatus allows you to customize the monitoring intervals based on your specific needs. You can choose how frequently you want your websites and services to be checked.',
	},
];
