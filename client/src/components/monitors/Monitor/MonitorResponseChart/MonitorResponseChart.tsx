'use client';

import { MonitorAnalytics } from '@/types';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import MonitorCard from '../MonitorCard/MonitorCard';
import { useMonitorResponseChart } from './useMonitorResponseChart.hook';

interface MonitorResponseChartProps {
	monitor: MonitorAnalytics;
}

const REGION_COLORS = [
	'#ef4444',
	'#3b82f6',
	'#10b981',
	'#f59e0b',
	'#8b5cf6',
	'#06b6d4',
];

const MonitorResponseChart = ({ monitor }: MonitorResponseChartProps) => {
	const { data: logs } = monitor;

	const { chartData, regions, dtf, toggleRegion, hiddenRegions } =
		useMonitorResponseChart(logs);

	return (
		<MonitorCard cardTitle="Response Time">
			<LineChart
				height={370}
				data={chartData}
				responsive
				margin={{
					top: 30,
				}}
			>
				<XAxis
					dataKey="timestamp"
					type="number"
					domain={['dataMin', 'dataMax']}
					tick={false}
					tickLine={false}
				/>
				<XAxis stroke="var(--chart-axis-color)" tick={false} />
				<YAxis width="auto" stroke="var(--chart-axis-color)" />
				<Tooltip
					formatter={(value, name) => [`${value} ms`, name]}
					cursor={false}
					labelFormatter={(_label, payload) => {
						const time = payload?.[0]?.payload?.timestamp;

						if (!time) return '';

						return dtf.format(new Date(time));
					}}
					contentStyle={{
						backgroundColor: 'var(--chart-tooltip-bg)',
						border: '1px solid var(--chart-tooltip-border)',
						textAlign: 'center',
						minWidth: '70px',
						borderRadius: '4px',
					}}
				/>
				<Legend
					verticalAlign="bottom"
					align="center"
					onClick={(e) => {
						if (typeof e.dataKey === 'string') {
							toggleRegion(e.dataKey);
						}
					}}
				/>
				{regions.map((region, index) => (
					<Line
						key={region.key}
						type="monotone"
						dataKey={region.id}
						name={region.name}
						stroke={REGION_COLORS[index % REGION_COLORS.length]}
						dot={false}
						activeDot={{ r: 4 }}
						connectNulls={true}
						hide={hiddenRegions.includes(region.id)}
					/>
				))}
			</LineChart>
		</MonitorCard>
	);
};

export default MonitorResponseChart;
