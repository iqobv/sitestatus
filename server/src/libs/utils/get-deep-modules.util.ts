import { Type } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';

export const getDeepModules = (modules: Type<unknown>[]): Type<unknown>[] => {
	const deepModules = new Set<Type<unknown>>();

	const scan = (module: Type<unknown>): void => {
		if (!module || deepModules.has(module)) return;

		deepModules.add(module);

		const imports =
			(Reflect.getMetadata(MODULE_METADATA.IMPORTS, module) as Array<
				Type<unknown> | { module: Type<unknown> }
			>) || [];

		for (const imp of imports) {
			const targetModule =
				(imp as { module: Type<unknown> }).module || (imp as Type<unknown>);

			if (typeof targetModule === 'function') {
				scan(targetModule);
			}
		}
	};

	modules.forEach(scan);

	return Array.from(deepModules);
};
