'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { THEME_ICONS } from './themeIcons';

interface SelectOption {
	value: string;
	label: string;
	icon?: IconType;
}

export const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, themes } = useTheme();

	const options: SelectOption[] = useMemo(
		() =>
			themes.map((theme) => ({
				value: theme,
				label: theme.charAt(0).toUpperCase() + theme.slice(1),
				icon: THEME_ICONS[theme] || null,
			})),
		[themes],
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Select
			defaultValue={theme}
			value={theme}
			onValueChange={(value) => setTheme(value)}
		>
			<SelectTrigger>
				{theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : 'Theme'}
			</SelectTrigger>
			<SelectContent width="fit-content" align="end">
				{options.map((option) => (
					<SelectItem value={option.value} key={option.value}>
						{option.icon && <option.icon size={18} />}
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
