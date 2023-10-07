import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
export default function Team({ auth, team_user, team, novel, status }) {
	// Toast
	useEffect(() => {
		// Success
		if (status.success) {
			toast.success(status.success, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		// Error
		if (status.error) {
			toast.error(status.error, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [status]);
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
					<h1 className='m-4 p-2 text-center text-3xl font-bold'>Thông tin nhóm</h1>
					<div className='mb-5'>
						<strong>Tên nhóm: </strong> <span>{team.team.team_name}</span> <br />
						<strong>Chi tiết: </strong>{' '}
						<span dangerouslySetInnerHTML={{ __html: `${team.team.team_detail}` }}></span>
					</div>

					{/* Show truyện */}
					<div className='mt-2'>
						<span className='text-xl font-bold'>Danh sách truyện</span>
						<div className='bottom relative mb-4 grid grid-cols-3 gap-2 py-2 sm:grid-cols-4 lg:grid-cols-6'>
							{novel.map((novel) => (
								<>
									<div className='card'>
										<img src={novel.thumbnail} alt='' className='' />
										<div className='name'>
											<h2 className='mt-2 text-center text-xl font-semibold'>{novel.name_novel}</h2>
											<p className='mt-0 font-semibold'> Tác giả: {novel.author}</p>
											<p className='mt-0 font-semibold'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img src={novel.thumbnail} alt='' className='' />
										<div className='name'>
											<h2 className='mt-2 text-center text-xl font-semibold'>{novel.name_novel}</h2>
											<p className='mt-0 font-semibold'> Tác giả: {novel.author}</p>
											<p className='mt-0 font-semibold'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img src={novel.thumbnail} alt='' className='' />
										<div className='name'>
											<h2 className='mt-2 text-center text-xl font-semibold'>{novel.name_novel}</h2>
											<p className='mt-0 font-semibold'> Tác giả: {novel.author}</p>
											<p className='mt-0 font-semibold'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img src={novel.thumbnail} alt='' className='' />
										<div className='name'>
											<h2 className='mt-2 text-center text-xl font-semibold'>{novel.name_novel}</h2>
											<p className='mt-0 font-semibold'> Tác giả: {novel.author}</p>
											<p className='mt-0 font-semibold'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img src={novel.thumbnail} alt='' className='' />
										<div className='name'>
											<h2 className='mt-2 text-center text-xl font-semibold'>{novel.name_novel}</h2>
											<p className='mt-0 font-semibold'> Tác giả: {novel.author}</p>
											<p className='mt-0 font-semibold'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
									<div className='card'>
										<img src={novel.thumbnail} alt='' className='' />
										<div className='name'>
											<h2 className='mt-2 text-center text-xl font-semibold'>{novel.name_novel}</h2>
											<p className='mt-0 font-semibold'> Tác giả: {novel.author}</p>
											<p className='mt-0 font-semibold'> Họa sĩ: {novel.illustrator}</p>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
					<Link className='btn' href={route('novel.index')}>
						Thêm truyện
					</Link>
					{/* Show truyện */}
					<div className='mt-2'>
						<span>Danh sách truyện</span>
						{novel.map((novel) => (
							<div key={novel.id}>
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
