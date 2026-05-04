import NotificationChannelsItemLoader from './NotificationChannelsItem/NotificationChannelsItemLoader';
import styles from './NotificationChannelsList.module.scss';

const items = Array.from({ length: 2 }).map((_, i) => (
	<NotificationChannelsItemLoader key={i} />
));

const NotificationChannelsListLoader = () => {
	return <div className={styles.list}>{items}</div>;
};

export default NotificationChannelsListLoader;
