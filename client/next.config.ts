import type { NextConfig } from 'next';
import './src/env';

const nextConfig: NextConfig = {
	allowedDevOrigins: [
		'lvh.me',
		'www.lvh.me',
		'app.lvh.me',
		'status.lvh.me',
		'app.localhost',
		'status.localhost',
		'sitestatus.iqob.dev',
		'www.sitestatus.iqob.dev',
		'app.sitestatus.iqob.dev',
		'status.sitestatus.iqob.dev',
	],
};

export default nextConfig;
