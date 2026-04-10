'use client';

import { BaseRegion } from '@/types/region';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './MonitorRegionControl.module.scss';

interface MonitorRegionControlProps {
	regions: BaseRegion[];
}

interface IndicatorStyles {
	transform: string;
	width: string;
}

const MonitorRegionControl = ({ regions }: MonitorRegionControlProps) => {
	const [indicatorStyles, setIndicatorStyles] = useState<IndicatorStyles>({
		transform: 'translateX(0px)',
		width: '0px',
	});
	const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

	const finalRegions: BaseRegion[] = useMemo(
		() => [
			{
				key: 'global',
				name: 'Global',
			},
			...(regions ?? []),
		],
		[regions],
	);

	const [selectedRegion, setSelectedRegion] = useQueryState(
		'region',
		parseAsString.withDefault('global').withOptions({
			clearOnDefault: true,
		}),
	);

	useEffect(() => {
		const activeIndex = finalRegions.findIndex(
			(region) => region.key === selectedRegion,
		);
		const currentButtonElement = buttonsRef.current[activeIndex];

		if (currentButtonElement) {
			setIndicatorStyles({
				transform: `translateX(${currentButtonElement.offsetLeft}px)`,
				width: `${currentButtonElement.offsetWidth}px`,
			});
		}
	}, [finalRegions, selectedRegion]);

	const handleRegionChange = (key: string) => {
		setSelectedRegion(key).catch(console.error);
	};

	return (
		<div className={styles['region-control']}>
			{finalRegions.length > 2 && (
				<>
					{finalRegions.map((region, index) => (
						<button
							key={region.key}
							ref={(element) => {
								buttonsRef.current[index] = element;
							}}
							onClick={() => handleRegionChange(region.key)}
							className={`${styles['region-control__button']} ${selectedRegion === region.key ? styles['region-control__button--active'] : ''}`}
						>
							{region.name}
						</button>
					))}
					<div
						className={styles['region-control__indicator']}
						style={indicatorStyles}
						aria-hidden
					/>
				</>
			)}
		</div>
	);
};

export default MonitorRegionControl;
