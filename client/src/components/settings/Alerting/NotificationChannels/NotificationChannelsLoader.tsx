import styles from './NotificationChannels.module.scss';
import NotificationChannelsItemLoader from './NotificationChannelsItem/NotificationChannelsItemLoader';

const items = Array.from({ length: 2 }).map((_, i) => (
	<NotificationChannelsItemLoader key={i} />
));

const NotificationChannelsLoader = () => {
	return <div className={styles.list}>{items}</div>;
};

export default NotificationChannelsLoader;
