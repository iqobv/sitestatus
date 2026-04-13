export interface MonitorCard<T> {
	title: string;
	tooltip?: string;
	render: (data: T) => React.ReactNode;
}
