import type { Request } from 'express';
import { ClientInfo } from '../types';

export const extractClientInfo = (req: Request): ClientInfo => {
	const forwardedFor = req.headers['x-forwarded-for'] as string | undefined;
	const ip = forwardedFor
		? forwardedFor.split(',')[0].trim()
		: req.socket.remoteAddress || '';
	const country =
		(req.headers['cf-ipcountry'] as string) ||
		(req.headers['x-vercel-ip-country'] as string) ||
		'';
	const city =
		(req.headers['cf-ipcity'] as string) ||
		(req.headers['x-vercel-ip-city'] as string) ||
		'';
	const userAgent = req.headers['user-agent'] || '';

	return { ip, country, city, userAgent };
};
