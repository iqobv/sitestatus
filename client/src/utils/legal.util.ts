import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export const getLegalDocument = (filename: string): string => {
	const filePath = join(process.cwd(), 'content', 'legal', `${filename}.md`);

	if (!existsSync(filePath)) {
		throw new Error(`Legal document "${filename}" not found.`);
	}

	return readFileSync(filePath, 'utf-8');
};
