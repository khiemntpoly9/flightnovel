import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
export default function Team({ auth, team }) {
	// Nếu chưa có team
	if (!team) {
		return (
			<DefaultLayout auth={auth}>
				<div className='container mx-auto w-10/12'>
					<div>
						{/* <Link className='btn' href='/team/create'> */}
						<Link className='btn' href={route('team.create')}>
							Tạo nhóm
						</Link>
					</div>
				</div>
			</DefaultLayout>
		);
	}
	return (
		<DefaultLayout auth={auth}>
			<div className='container mx-auto w-10/12'>
				<div>Bạn đã có nhóm</div>
				<div>
					Tên nhóm: <span>{team.team_name}</span> <br />
					<div dangerouslySetInnerHTML={{ __html: `${team.team_detail}` }}></div>
				</div>
				<Link className='btn' href={route('novel.index')}>
					Thêm truyện
				</Link>
			</div>
		</DefaultLayout>
	);
}
