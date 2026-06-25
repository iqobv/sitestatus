import { Button, SectionHeader } from '@/components/ui';
import { MdErrorOutline } from 'react-icons/md';
import { NotificationChannelsVerifyWrapper } from './NotificationChannelsVerifyWrapper';

interface NotificationChannelsVerifyErrorProps {
	title: React.ReactNode;
	message: React.ReactNode;
	href: string;
	hrefText: React.ReactNode;
}

export const NotificationChannelsVerifyError = ({
	title,
	message,
	href,
	hrefText,
}: NotificationChannelsVerifyErrorProps) => {
	return (
		<NotificationChannelsVerifyWrapper icon={<MdErrorOutline size={38} />}>
			<SectionHeader
				title={title}
				description={message}
				textAlign="center"
				titleProps={{ variant: 'h2' }}
			/>
			<Button href={href}>{hrefText}</Button>
		</NotificationChannelsVerifyWrapper>
	);
};
