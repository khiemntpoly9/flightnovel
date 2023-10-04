import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
export default function Team({ auth, team_user, team, novel, success }) {
	// Toast
	useEffect(() => {
		if (success) {
			toast.success(success, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [success]);
	// Nếu chưa có team
	if (!team_user) {
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
	} else {
		return (
			<DefaultLayout auth={auth}>
				<div className='container mx-auto w-10/12'>
					<div>
						Tên nhóm: <span>{team.team.team_name}</span> <br />
						<div dangerouslySetInnerHTML={{ __html: `${team.team.team_detail}` }}></div>
					</div>
					<Link className='btn' href={route('novel.index')}>
						Thêm truyện
					</Link>
					{/* Show truyện */}
					<div className='mt-2'>
						<span>Danh sách truyện</span>
						{novel.map((novel) => (
							<div key={novel.id_novel}>
								<img src={novel.thumbnail} alt='thumbnail' />
								<p>{novel.name_novel}</p>
							</div>
						))}
					</div>
				</div>
			</DefaultLayout>
		);
	}
}
