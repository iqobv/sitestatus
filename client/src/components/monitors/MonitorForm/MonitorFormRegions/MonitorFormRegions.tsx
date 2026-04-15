'use client';

import { getAllRegions } from '@/api';
import { Checkbox, SectionHeader } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { BaseRegionsMonitorDto } from '@/dto';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import styles from './MonitorFormRegions.module.scss';
import MonitorFormRegionsLoader from './MonitorFormRegionsLoader';

const MonitorFormRegions = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<BaseRegionsMonitorDto>();

	const { data, isLoading } = useQuery({
		queryFn: getAllRegions,
		queryKey: QUERY_KEYS.region.list,
	});

	return (
		<div className={styles['monitor-form-regions']}>
			{isLoading ? (
				<MonitorFormRegionsLoader />
			) : (
				<>
					<SectionHeader title="Regions" titleComponent="h2" padding={0} />
					<ul className={styles['monitor-form-regions__list']}>
						{data?.map((region) => (
							<li
								key={region.id}
								className={styles['monitor-form-regions__list-item']}
							>
								<Checkbox
									id={region.key}
									value={region.id}
									label={region.name}
									isBordered
									{...register('regions')}
								/>
							</li>
						))}
					</ul>
				</>
			)}
			{errors.regions && (
				<p className="error-message">{errors.regions.message}</p>
			)}
		</div>
	);
};

export default MonitorFormRegions;
