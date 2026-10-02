'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { Command, CommandInput, CommandList } from 'cmdk';
import { CSSProperties, UIEvent } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from '../../Select/SelectContent/SelectContent.module.scss';
import { ComboboxContentProps } from '../Combobox.types';
import cbcStyles from './ComboboxContent.module.scss';

export const ComboboxContent = ({
	children,
	className,
	ref,
	searchPlaceholder = 'Search...',
	onScrollEnd,
	scrollThreshold = 50,
	width = 'trigger',
	sideOffset = 4,
	isLoading = false,
	onSearchChange,
	searchValue,
	shouldFilter = true,
	...props
}: ComboboxContentProps) => {
	const widthStyles: CSSProperties = {
		width: width === 'trigger' ? 'var(--radix-popover-trigger-width)' : width,
		minWidth:
			width === 'trigger' ? 'var(--radix-popover-trigger-width)' : undefined,
	};

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		if (!onScrollEnd) return;
		const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
		if (scrollHeight - scrollTop - clientHeight <= scrollThreshold) {
			onScrollEnd();
		}
	};

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={ref}
				className={clsx(styles.content, className)}
				sideOffset={sideOffset}
				style={widthStyles}
				{...props}
			>
				<Command className={cbcStyles.command} shouldFilter={shouldFilter}>
					<CommandInput
						placeholder={searchPlaceholder}
						className={cbcStyles.searchInput}
						value={searchValue}
						onValueChange={onSearchChange}
					/>
					<CommandList
						className={cbcStyles.commandList}
						onScroll={handleScroll}
					>
						{children}
						{isLoading && <Loader />}
					</CommandList>
				</Command>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
};
