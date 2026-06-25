import { Prisma, User } from '@generated/postgres/client';
import { Sql } from '@prisma/client/runtime/client';

export const unreadCountSql = (user: User): Sql => Prisma.sql`
	SELECT SUM(unread) as "countUnread"
	FROM (
		SELECT COUNT(id) as unread
		FROM notifications
		WHERE user_id = ${user.id}
			AND is_app_notification = true
			AND is_read = false

		UNION ALL

		SELECT COUNT(gn.id) as unread
		FROM global_notifications gn
		LEFT JOIN global_notification_reads gnr
			ON gn.id = gnr.global_notification_id AND gnr.user_id = ${user.id}
		WHERE gn.is_app_notification = true
			AND gnr.user_id IS NULL
			AND gn.created_at >= ${user.createdAt}
	) as sub
`;
