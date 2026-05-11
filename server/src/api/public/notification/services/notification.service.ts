import { User } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { Injectable } from '@nestjs/common';
import { NotificationDto } from '../dto';
import { GlobalNotificationService } from './global-notification.service';
import { PersonalNotificationService } from './personal-notification.service';

@Injectable()
export class NotificationService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly globalNotificationService: GlobalNotificationService,
		private readonly personalNotificationService: PersonalNotificationService,
	) {}

	async getUserNotifications(user: User) {
		const fourteenDaysAgo = new Date();
		fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

		const [personalNotifications, globalNotifications] = await Promise.all([
			this.prismaService.notification.findMany({
				where: {
					userId: user.id,
					isAppNotification: true,
					OR: [
						{
							createdAt: {
								gte: fourteenDaysAgo,
							},
						},
						{
							isRead: false,
						},
					],
				},
			}),
			this.prismaService.globalNotification.findMany({
				where: {
					isAppNotification: true,
					createdAt: {
						gte: user.createdAt,
					},
				},
				include: { globalNotificationReads: true },
			}),
		]);

		const mappedGlobalNotifications: NotificationDto[] = globalNotifications
			.filter((notification) => {
				const isRead = notification.globalNotificationReads.some(
					(read) => read.userId === user.id,
				);

				if (notification.createdAt < fourteenDaysAgo && isRead) {
					return false;
				}

				return true;
			})
			.map(
				({
					globalNotificationReads,
					isAppNotification: _ian,
					isEmailNotification: _iem,
					...rest
				}) => ({
					...rest,
					isRead: globalNotificationReads.some(
						(read) => read.userId === user.id,
					),
					isGlobal: true,
				}),
			);

		const mappedPersonalNotifications: NotificationDto[] =
			personalNotifications.map(
				({ isAppNotification: _ian, isEmailNotification: _iem, ...rest }) => ({
					...rest,
					isGlobal: false,
				}),
			);

		const allNotifications: NotificationDto[] = [
			...mappedPersonalNotifications,
			...mappedGlobalNotifications,
		];

		const sortedNotifications: NotificationDto[] = allNotifications.sort(
			(a, b) =>
				Number(a.isRead) - Number(b.isRead) ||
				b.createdAt.getTime() - a.createdAt.getTime(),
		);

		const countUnread = sortedNotifications.filter((n) => !n.isRead).length;
		const hasUnread = countUnread > 0;
		const takeCount = Math.max(20, countUnread);
		const notifications = sortedNotifications.slice(0, takeCount);

		return { notifications, hasUnread, countUnread };
	}

	async markAllAsRead(user: User) {
		await Promise.all([
			this.personalNotificationService.markAllPersonalNotificationsAsRead(
				user.id,
			),
			this.globalNotificationService.markAllGlobalNotificationsAsRead(user),
		]);
	}
}
