import MonitorIncidentsLoader from './MonitorIncidents/MonitorIncidentsLoader';
import MonitorRegionStatsLoader from './MonitorRegionStats/MonitorRegionStatsLoader';
import MonitorResponseCardsLoader from './MonitorResponseCards/MonitorResponseCardsLoader';
import MonitorResponseChartLoader from './MonitorResponseChart/MonitorResponseChartLoader';

const MonitorAnalyticsLoader = () => {
	return (
		<>
			<MonitorRegionStatsLoader />
			<MonitorResponseChartLoader />
			<MonitorResponseCardsLoader />
			<MonitorIncidentsLoader />
		</>
	);
};

export default MonitorAnalyticsLoader;
