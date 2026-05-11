import StatusPageDetailsHeaderLoader from './StatusPageDetailsHeader/StatusPageDetailsHeaderLoader';
import StatusPageDetailsUpdateLoader from './StatusPageDetailsUpdate/StatusPageDetailsUpdateLoader';

const StatusPageDetailsLoader = () => {
	return (
		<div>
			<StatusPageDetailsHeaderLoader />
			<StatusPageDetailsUpdateLoader />
		</div>
	);
};

export default StatusPageDetailsLoader;
