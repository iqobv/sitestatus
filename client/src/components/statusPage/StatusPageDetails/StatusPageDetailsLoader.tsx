import { StatusPageDetailsHeaderLoader } from './StatusPageDetailsHeader/StatusPageDetailsHeaderLoader';
import { StatusPageDetailsUpdateLoader } from './StatusPageDetailsUpdate/StatusPageDetailsUpdateLoader';

export const StatusPageDetailsLoader = () => {
	return (
		<div>
			<StatusPageDetailsHeaderLoader />
			<StatusPageDetailsUpdateLoader />
		</div>
	);
};
