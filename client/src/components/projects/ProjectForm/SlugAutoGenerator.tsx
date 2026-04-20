'use client';

import { useEffect, useMemo } from 'react';
import {
	FieldValues,
	Path,
	PathValue,
	useFormContext,
	useWatch,
} from 'react-hook-form';
import slugify from 'slugify';

export interface SlugAutoGeneratorProps<D extends FieldValues> {
	source: Path<D>;
	target: Path<D>;
	autoSync: boolean;
}

export const SlugAutoGenerator = <D extends FieldValues>({
	source,
	target,
	autoSync,
}: SlugAutoGeneratorProps<D>) => {
	const { setValue, getFieldState, formState, clearErrors } =
		useFormContext<D>();

	const sourceValue = useWatch({ name: source });
	const targetValue = useWatch({ name: target });

	const defaultSlugifyOptions = useMemo(
		() => ({
			replacement: '-',
			remove: /[*+~.()'"!:@]/g,
			lower: true,
			strict: true,
		}),
		[],
	);

	useEffect(() => {
		const { isDirty } = getFieldState(target, formState);

		if (autoSync && !isDirty && typeof sourceValue === 'string') {
			const generatedSlug = slugify(sourceValue, {
				...defaultSlugifyOptions,
				trim: true,
			});

			if (generatedSlug !== targetValue) {
				setValue(target, generatedSlug as PathValue<D, Path<D>>, {
					shouldValidate: true,
					shouldDirty: false,
				});

				if (generatedSlug === '') {
					clearErrors(target);
				}
			}
		} else if (isDirty && typeof targetValue === 'string') {
			const formattedSlug = slugify(targetValue, {
				...defaultSlugifyOptions,
				trim: false,
			});

			if (formattedSlug !== targetValue) {
				setValue(target, formattedSlug as PathValue<D, Path<D>>, {
					shouldValidate: true,
					shouldDirty: true,
				});
			}
		}
	}, [
		sourceValue,
		targetValue,
		autoSync,
		setValue,
		target,
		getFieldState,
		formState,
		clearErrors,
	]);

	return null;
};
