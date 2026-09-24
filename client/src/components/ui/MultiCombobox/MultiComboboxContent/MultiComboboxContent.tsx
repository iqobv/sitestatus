'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { Command, CommandInput, CommandList } from 'cmdk';
import { CSSProperties, UIEvent } from 'react';
import { Loader } from '../../Loader/Loader';
import { MultiComboboxContentProps } from '../MultiCombobox.types';
import styles from './MultiComboboxContent.module.scss';

export const MultiComboboxContent = ({
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
	style,
	...props
}: MultiComboboxContentProps) => {
	const widthStyles: CSSProperties = {
		width: width === 'trigger' ? 'var(--radix-popover-trigger-width)' : width,
		minWidth:
			width === 'trigger' ? 'var(--radix-popover-trigger-width)' : undefined,
	};

	console.log(width);

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		if (!onScrollEnd) return;

		const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

		if (scrollHeight - scrollTop - clientHeight <= scrollThreshold)
			onScrollEnd();
	};

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={ref}
				className={clsx(styles.content, className)}
				sideOffset={sideOffset}
				style={{ ...widthStyles, ...style }}
				{...props}
			>
				<Command className={styles.command} shouldFilter={shouldFilter}>
					<CommandInput
						placeholder={searchPlaceholder}
						className={styles.searchInput}
						value={searchValue}
						onValueChange={onSearchChange}
					/>
					<CommandList className={styles.commandList} onScroll={handleScroll}>
						{children}
						{isLoading && <Loader />}
					</CommandList>
				</Command>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
};
