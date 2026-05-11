export const NOTIFICATION_CHANNEL_ERROR_MESSAGES = {
	ALREADY_EXISTS:
		'Notification channel with the same value and type already exists.',
	NOT_FOUND: 'Notification channel not found.',
	CANNOT_REMOVE_PRIMARY: 'Cannot remove primary notification channel.',
	CANNOT_UPDATE_PRIMARY: 'Cannot update primary notification channel.',
	PRIMARY_ALREADY_EXISTS:
		'Primary notification channel already exists. Only one primary channel is allowed.',
	ALREADY_VERIFIED: 'Notification channel is already verified.',
} as const;
