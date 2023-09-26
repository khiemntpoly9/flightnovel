import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';

export default function Novel() {
	return (
		<DefaultLayout>
			<Head title='Novel' />
			<div>Thêm truyện</div>
		</DefaultLayout>
	);
}
