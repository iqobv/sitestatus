import { StatusPage as StatusPageComponent } from '@/components/statusPage/StatusPage/StatusPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Status Page',
};

export default function StatusPage() {
	return (
		<div className="container">
			<StatusPageComponent />
		</div>
	);
}
