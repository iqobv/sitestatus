import { Button, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { MdCheckCircleOutline } from 'react-icons/md';
import { NotificationChannelsVerifyWrapper } from './NotificationChannelsVerifyWrapper';

export const NotificationChannelsVerifySuccess = () => {
	return (
		<NotificationChannelsVerifyWrapper
			icon={<MdCheckCircleOutline size={38} />}
		>
			<SectionHeader
				title="Success!"
				description="Your notification channel has been successfully confirmed"
				textAlign="center"
			/>
			<Button href={PRIVATE_PAGES.SETTINGS.ALERTING}>
				Go back to alerting settings
			</Button>
		</NotificationChannelsVerifyWrapper>
	);
};
