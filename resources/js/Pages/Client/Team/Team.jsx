import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import ViewTeam from '../Components/ViewTeam';
export default function Team({ auth, team_user, team_member, team, novel, status, views }) {
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
	//
	const [activeTab, setActiveTab] = useState(1);
	const handleTabChange = (tabIndex) => {
		setActiveTab(tabIndex);
	};
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
				<Head title={`Nhóm ${team.team.team_name}`} />
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
						{team_user.team_role === 1 ? (
							<div>
								<button
									className='ml-1 rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
									onClick={() => document.getElementById(`modal_delete_group`).showModal()}
								>
									Giải tán nhóm
								</button>
								<dialog id={`modal_delete_group`} className='modal'>
									<div className='modal-box'>
										<form method='dialog'>
											<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
										</form>
										<h3 className='text-lg font-bold'>Giải tán nhóm!</h3>
										<p className='py-4 text-base font-normal'>
											Bạn có chắc muốn giải tán nhóm "{team.team.team_name}"? <br /> Điều này đồng nghĩa với
											việc bạn sẽ xóa mọi dữ liệu liên quan đến nhóm.
										</p>
										<div className='modal-action'>
											<form method='dialog'>
												<button
													onClick={() => {
														router.delete(`/team/${team.team.slug}/delete`);
													}}
													className='btn mr-2 bg-red-500 text-white hover:bg-red-400'
												>
													Giải tán
												</button>
												<button className='btn'>Đóng</button>
											</form>
										</div>
									</div>
								</dialog>
							</div>
						) : null}
					</div>
					{/*  */}
					<div className='mt-3'>
						<div className='tabs tabs-lifted'>
							<input
								type='radio'
								name='my_tabs_2'
								className='tab'
								aria-label='Ngày'
								checked={activeTab === 1}
								onChange={() => handleTabChange(1)}
							/>
							<div className='tab-content rounded-box border-base-300 bg-base-100 p-10'>
								{activeTab === 1 && <ViewTeam viewday={views[0]} />}
							</div>
							<input
								type='radio'
								name='my_tabs_2'
								className='tab'
								aria-label='Tuần'
								checked={activeTab === 2}
								onChange={() => handleTabChange(2)}
							/>
							<div className='tab-content rounded-box border-base-300 bg-base-100 p-10'>
								{activeTab === 2 && <ViewTeam viewweek={views[1]} />}
							</div>
							<input
								type='radio'
								name='my_tabs_2'
								className='tab'
								aria-label='Tháng'
								checked={activeTab === 3}
								onChange={() => handleTabChange(3)}
							/>
							<div className='tab-content rounded-box border-base-300 bg-base-100 p-10'>
								{activeTab === 3 && <ViewTeam viewmonth={views[2]} />}
							</div>
						</div>
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
									<div className='h-96 overflow-x-auto'>
										<table className='table table-pin-rows'>
											<tbody>
												{team_member.map(({ user }, index) => (
													<tr key={index}>
														<td>
															<div className='flex gap-2'>
																<img className='h-10 w-10 rounded-full object-cover' src={user.avatar} />
																<div className='flex items-center'>
																	<span>{user.name}</span>
																</div>
																{team_user.team_role === 1 ? (
																	user.id !== auth.user.id ? (
																		<button
																			onClick={() => {
																				if (
																					window.confirm(
																						`Bạn có chắc chắn muốn xóa thành viên ${user.name} không?`
																					)
																				) {
																					// Nếu người dùng xác nhận xóa, thực hiện lệnh xóa ở đây
																					router.delete(`/team/${team.team.slug}/delete/${user.id}`);
																				}
																			}}
																			className='btn btn-error btn-sm text-white'
																		>
																			Xóa
																		</button>
																	) : null
																) : null}
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DefaultLayout>
		);
	}
}
