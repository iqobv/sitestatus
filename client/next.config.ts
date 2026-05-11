import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: [
		'lvh.me',
		'app.lvh.me',
		'status.lvh.me',
		'app.localhost',
		'status.localhost',
	],
};

export default nextConfig;
