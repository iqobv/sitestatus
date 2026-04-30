'use client';

import { Select } from '@/components/ui';
import { SelectOption } from '@/components/ui/Select/Select.types';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, themes } = useTheme();

	const options: SelectOption[] = useMemo(
		() =>
			themes.map((theme) => ({
				value: theme,
				label: theme.charAt(0).toUpperCase() + theme.slice(1),
			})),
		[themes],
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Select
			options={options}
			value={theme}
			onChange={(value) => setTheme(value)}
		/>
	);
};

export default ThemeSwitcher;
