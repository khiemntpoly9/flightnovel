import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';

export default function Novel({ auth }) {
	return (
		<DefaultLayout auth={auth}>
			<Head title='Novel' />
			<div>Thêm truyện</div>
		</DefaultLayout>
	);
}
