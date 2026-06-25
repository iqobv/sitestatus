import styles from './NotificationChannelsVerify.module.scss';

interface NotificationChannelsVerifyWrapperProps {
	children: React.ReactNode;
	icon?: React.ReactNode;
}

export const NotificationChannelsVerifyWrapper = ({
	children,
	icon,
}: NotificationChannelsVerifyWrapperProps) => {
	return (
		<div className={styles.wrapper}>
			{icon && <div className={styles.icon}>{icon}</div>}
			<div className={styles.content}>{children}</div>
		</div>
	);
};
