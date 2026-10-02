'use client';

import { getAllNotifications } from '@/api/notification/getAllNotifications.api';
import { markAllNotificationAsRead } from '@/api/notification/markAllNotificationAsRead.api';
import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownTrigger,
} from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import styles from './NotificationList.module.scss';
import { NotificationListItem } from './NotificationListItem/NotificationListItem';
import { NotificationListLoader } from './NotificationListLoader';

export const NotificationList = () => {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: QUERY_KEYS.notifications.infinite(),
			queryFn: ({ pageParam }) =>
				getAllNotifications({
					page: pageParam,
					limit: 20,
				}),
			getNextPageParam: (lastPage, _, lastPageParam) =>
				lastPage.hasNextPage ? lastPageParam + 1 : undefined,
			initialPageParam: 1,
		});

	const { mutate: markAllAsRead } = useMutation({
		mutationFn: markAllNotificationAsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notifications.all,
			});
		},
	});

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

		if (
			scrollHeight - scrollTop <= clientHeight + 10 &&
			hasNextPage &&
			!isFetchingNextPage
		)
			fetchNextPage();
	};

	const hasUnread = data?.pages.some((page) => page.hasUnread) || false;

	const items = data?.pages.flatMap((page) => page.notifications) || [];

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);

		if (!open && hasUnread) markAllAsRead();
	};

	return (
		<Dropdown open={isOpen} onOpenChange={handleOpenChange}>
			<DropdownTrigger asChild>
				<Button
					variant="outlined"
					isIcon
					className={clsx(hasUnread && styles.unread)}
				>
					<MdNotificationsNone size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownContent onScroll={handleScroll}>
				<div className={styles.list} onScroll={handleScroll}>
					{isLoading && <NotificationListLoader />}
					{items.length === 0 && (
						<p className={styles.noData}>No notifications available</p>
					)}
					{items &&
						items.map((notification) => (
							<NotificationListItem
								key={notification.id}
								notification={notification}
							/>
						))}
				</div>
			</DropdownContent>
		</Dropdown>
	);
};
