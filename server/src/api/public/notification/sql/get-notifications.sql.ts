import { Prisma } from '@generated/postgres/client';
import { Sql } from '@prisma/client/runtime/client';

export const getNotificationsSql = (
	userId: string,
	date: Date,
	limit: number,
	offset: number,
): Sql => Prisma.sql`
  WITH combined_notifications AS (
    SELECT
      n.id,
      n.type,
      false AS "isGlobal",
      n.is_read AS "isRead",
      n.title,
      n.message,
      n.action_url AS "actionUrl",
      n.created_at AS "createdAt",
      n.updated_at AS "updatedAt"
    FROM notifications n
    WHERE n.user_id = ${userId}
      AND n.is_app_notification = true
      AND (n.is_read = false OR n.created_at >= ${date})

    UNION ALL

    SELECT
      gn.id,
      gn.type,
      true AS "isGlobal",
      CASE WHEN gnr.user_id IS NULL THEN false ELSE true END AS "isRead",
      gn.title,
      gn.message,
      gn.action_url AS "actionUrl",
      gn.created_at AS "createdAt",
      gn.updated_at AS "updatedAt"
    FROM global_notifications gn
    LEFT JOIN global_notification_reads gnr ON gn.id = gnr.global_notification_id AND gnr.user_id = ${userId}
    WHERE gn.is_app_notification = true
      AND gn.created_at >= ${date}
  )
  SELECT *
  FROM combined_notifications
  ORDER BY "isRead" ASC, "createdAt" DESC
  LIMIT ${limit}
  OFFSET ${offset}
`;
