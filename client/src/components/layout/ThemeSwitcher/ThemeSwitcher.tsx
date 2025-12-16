'use client';

import { Button } from '@/components/ui';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const handleClick = () =>
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

	if (!mounted) return null;

	return <Button onClick={handleClick}>Switch Theme</Button>;
};

export default ThemeSwitcher;
