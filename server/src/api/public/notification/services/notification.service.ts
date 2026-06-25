import { User } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { PaginationQueryDto } from '@libs/dto/pagination.dto';
import { Injectable } from '@nestjs/common';
import { NotificationDto, UserNotificationsDto } from '../dto/notification.dto';
import { getNotificationsSql } from '../sql/get-notifications.sql';
import { unreadCountSql } from '../sql/unread-count.sql';
import { GlobalNotificationService } from './global-notification.service';
import { PersonalNotificationService } from './personal-notification.service';

@Injectable()
export class NotificationService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly globalNotificationService: GlobalNotificationService,
		private readonly personalNotificationService: PersonalNotificationService,
	) {}

	public async getUserNotifications(
		user: User,
		query: PaginationQueryDto,
	): Promise<UserNotificationsDto> {
		const { page = 1, limit = 20 } = query;

		const offset = (page - 1) * limit;

		const fourteenDaysAgo = new Date();
		fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

		const unreadCountResult = await this.prismaService.$queryRaw<
			{
				countUnread: bigint;
			}[]
		>(unreadCountSql(user));

		const countUnread = Number(unreadCountResult[0]?.countUnread || 0);
		const hasUnread = countUnread > 0;

		const rawNotifications = await this.prismaService.$queryRaw<
			NotificationDto[]
		>(getNotificationsSql(user.id, fourteenDaysAgo, limit + 1, offset));

		const hasNextPage = rawNotifications.length > limit;

		const notifications = hasNextPage
			? rawNotifications.slice(0, limit)
			: rawNotifications;

		return { notifications, hasUnread, countUnread, hasNextPage };
	}

	public async markAllAsRead(user: User): Promise<void> {
		await Promise.all([
			this.personalNotificationService.markAllPersonalNotificationsAsRead(
				user.id,
			),
			this.globalNotificationService.markAllGlobalNotificationsAsRead(user),
		]);
	}
}
