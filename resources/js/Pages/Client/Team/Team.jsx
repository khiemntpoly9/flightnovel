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
					<h1 className='text-center font-bold text-3xl p-2 m-4'>Thông tin nhóm</h1>
					<div className='mb-5'>
						<strong>Tên nhóm: </strong> <span>{team.team.team_name}</span> <br />
						<strong>Chi tiết: </strong> <span dangerouslySetInnerHTML={{ __html: `${team.team.team_detail}` }}></span>
					</div>
					
					{/* Show truyện */}
					<div className='mt-2'>
						<span className='font-bold text-xl'>Danh sách truyện</span>
						<div className='bottom relative grid grid-cols-3 gap-2 py-2 sm:grid-cols-4 lg:grid-cols-6 mb-4'>
							{novel.map((novel) => (
								<>
									<div className='card'>
										<img
											src={novel.thumbnail}
											alt=''
											className=''
										/>
										<div className='name'>
											<h2 className='font-semibold mt-2 text-xl text-center'>{novel.name_novel}</h2>
											<p className='font-semibold mt-0'> Tác giả: {novel.author}</p>
											<p className='font-semibold mt-0'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img
											src={novel.thumbnail}
											alt=''
											className=''
										/>
										<div className='name'>
											<h2 className='font-semibold mt-2 text-xl text-center'>{novel.name_novel}</h2>
											<p className='font-semibold mt-0'> Tác giả: {novel.author}</p>
											<p className='font-semibold mt-0'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img
											src={novel.thumbnail}
											alt=''
											className=''
										/>
										<div className='name'>
											<h2 className='font-semibold mt-2 text-xl text-center'>{novel.name_novel}</h2>
											<p className='font-semibold mt-0'> Tác giả: {novel.author}</p>
											<p className='font-semibold mt-0'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img
											src={novel.thumbnail}
											alt=''
											className=''
										/>
										<div className='name'>
											<h2 className='font-semibold mt-2 text-xl text-center'>{novel.name_novel}</h2>
											<p className='font-semibold mt-0'> Tác giả: {novel.author}</p>
											<p className='font-semibold mt-0'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img
											src={novel.thumbnail}
											alt=''
											className=''
										/>
										<div className='name'>
											<h2 className='font-semibold mt-2 text-xl text-center'>{novel.name_novel}</h2>
											<p className='font-semibold mt-0'> Tác giả: {novel.author}</p>
											<p className='font-semibold mt-0'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img
											src={novel.thumbnail}
											alt=''
											className=''
										/>
										<div className='name'>
											<h2 className='font-semibold mt-2 text-xl text-center'>{novel.name_novel}</h2>
											<p className='font-semibold mt-0'> Tác giả: {novel.author}</p>
											<p className='font-semibold mt-0'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
					<Link className='btn' href={route('novel.index')}>
						Thêm truyện
					</Link>
				</div>
			</DefaultLayout>
		);
	}
}
