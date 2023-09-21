import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
export default function Team({ auth }) {
	return (
		<DefaultLayout auth={auth}>
			<div className='container mx-auto w-10/12'>
				<div>
					<Link className='btn' href='/team/create'>
						Tạo nhóm
					</Link>
				</div>
			</div>
		</DefaultLayout>
	);
}
