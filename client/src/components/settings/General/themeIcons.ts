import { IconType } from 'react-icons';
import {
	MdOutlineComputer,
	MdOutlineDarkMode,
	MdOutlineLightMode,
} from 'react-icons/md';

export const THEME_ICONS: Record<string, IconType> = {
	light: MdOutlineLightMode,
	dark: MdOutlineDarkMode,
	system: MdOutlineComputer,
};
