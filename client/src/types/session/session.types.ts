export interface Session {
	id: string;
	userId: string;
	expiresAt: Date;
	ip: string | null;
	country: string | null;
	city: string | null;
	browser: string | null;
	os: string | null;
	device: string | null;
	createdAt: Date;
	updatedAt: Date;
}
