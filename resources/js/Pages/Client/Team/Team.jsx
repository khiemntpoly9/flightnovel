import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
export default function Team({ auth, team_user, team_member, team, novel, status }) {
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
					{/* Edit team */}
					<div className='flex'>
						{team_user.team_role === 1 ? (
							<Link
								href={`/team/${team.team.slug}/edit`}
								className='rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
							>
								Chỉnh sửa chi tiết nhóm
							</Link>
						) : null}
						{team_user.team_role === 1 ? (
							<Link
								href={`/team/${team.team.slug}/add-member`}
								className='ml-1 rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
							>
								Thêm thành viên
							</Link>
						) : null}
					</div>
					{/*  */}
					<div className='flex flex-col lg:flex-row'>
						{/* Left */}
						<div className='w-full lg:w-8/12'>
							<div className='relative w-full py-6'>
								{/* Show truyện */}
								<div>
									<span className='text-xl font-bold'>Danh sách truyện</span>
									<div className='bottom mb-5 mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6'>
										{novel.map((novel) => (
											<div key={novel.id} className='card rounded-t-md bg-base-100 shadow-xl'>
												<img
													src={novel.thumbnail}
													alt=''
													className='h-full w-full rounded-t-md object-cover'
												/>
												<div className='my-3 p-2'>
													<Link href={`/team/novel/${novel.slug}`} className='mt-2 text-lg font-semibold'>
														{novel.name_novel}
													</Link>
													<p className='mt-1 font-semibold'> Tác giả: {novel.author}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<Link className='btn' href={route('novel.index')}>
								Thêm truyện
							</Link>
						</div>
						{/* Right */}
						<div className='w-full lg:w-4/12'>
							<div className='py-6'>
								<span className='text-xl font-bold'>Danh sách thành viên</span>
								<div className='mt-2 flex gap-2'>
									{team_member.map(({ user }, index) => (
										<div key={index}>
											<div className='flex gap-2'>
												<img className='h-10 w-10 rounded-full object-cover' src={user.avatar} />
												<div className='flex items-center'>
													<span>{user.name}</span>
												</div>
												{team_user.team_role === 1 ? <button className='btn btn-error'>Xóa</button> : null}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}
