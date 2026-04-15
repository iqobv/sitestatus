import * as crypto from 'crypto';

export function hashValidator(validator: string): string {
	return crypto.createHash('sha256').update(validator).digest('hex');
}

export function compareValidators(
	provided: string,
	storedHash: string,
): boolean {
	const providedHash = hashValidator(provided);
	const providedBuffer = Buffer.from(providedHash, 'hex');
	const storedBuffer = Buffer.from(storedHash, 'hex');

	if (providedBuffer.length !== storedBuffer.length) {
		return false;
	}

	return crypto.timingSafeEqual(providedBuffer, storedBuffer);
}
