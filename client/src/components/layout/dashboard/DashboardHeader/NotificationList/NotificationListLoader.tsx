import { NotificationListItemLoader } from './NotificationListItem/NotificationListItemLoader';

export const NotificationListLoader = () => {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<NotificationListItemLoader key={i} />
			))}
		</>
	);
};
