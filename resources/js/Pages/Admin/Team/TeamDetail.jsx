import AdminLayout from '@/Layouts/AdminLayout';
import View from '@/Pages/Client/Components/View';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function TeamDetail({ team, team_member, novel, views }) {
	const [activeTab, setActiveTab] = useState(1);
	const handleTabChange = (tabIndex) => {
		setActiveTab(tabIndex);
	};
	return (
		<AdminLayout>
			<Head title={`Nhóm ${team.team_name}`} />
			<div className='p-2'>
				<h2 className='text-center text-xl md:text-5xl'>Nhóm</h2>
				<div className='mb-5'>
					<strong>Tên nhóm: </strong> <span>{team.team_name}</span> <br />
					<strong>Chi tiết: </strong>{' '}
					<span dangerouslySetInnerHTML={{ __html: `${team.team_detail}` }}></span>
				</div>
				{/* Xếp hạng lượt xem truyện */}
				<div className='mt-3'>
					<h1 className='title-main mb-1'>Top lượt xem</h1>
					<div className='tabs tabs-lifted'>
						<input
							type='radio'
							name='my_tabs_2'
							className='tab'
							aria-label='Ngày'
							checked={activeTab === 1}
							onChange={() => handleTabChange(1)}
						/>
						<div className='tab-content rounded-box border-base-300 bg-base-100 p-2 md:p-10'>
							{activeTab === 1 && <View viewday={views[0]} />}
						</div>
						<input
							type='radio'
							name='my_tabs_2'
							className='tab'
							aria-label='Tuần'
							checked={activeTab === 2}
							onChange={() => handleTabChange(2)}
						/>
						<div className='tab-content rounded-box border-base-300 bg-base-100 p-2 md:p-10'>
							{activeTab === 2 && <View viewweek={views[1]} />}
						</div>
						<input
							type='radio'
							name='my_tabs_2'
							className='tab'
							aria-label='Tháng'
							checked={activeTab === 3}
							onChange={() => handleTabChange(3)}
						/>
						<div className='tab-content rounded-box border-base-300 bg-base-100 p-2 md:p-10'>
							{activeTab === 3 && <View viewmonth={views[2]} />}
						</div>
					</div>
					{/* Thành viên nhóm */}
					<div className='mt-2'>
						<h1 className='title-main'>Thành viên nhóm</h1>
						<div>
							{team_member.map((item, index) => (
								<div
									key={index}
									tabIndex={0}
									className='collapse collapse-arrow mt-2 border border-base-300 bg-base-200'
								>
									<div className='collapse-title text-xl font-medium'>
										<div className='flex'>
											<div className='h-10 w-10 rounded-full border-2 border-orange-400'>
												<img className='h-full w-full rounded-full' src={item.user.avatar} alt='avatar' />
											</div>
											<div className='ml-2 flex content-center'>
												<span className='pt-1'>{item.user.name}</span>
											</div>
										</div>
									</div>
									<div className='collapse-content'>
										<div className='flex flex-col'>
											<span className='text-md'>Email: {item.user.email}</span>
											<span>Vai trò: {item.team_role ? 'Nhóm trưởng' : 'Thành viên'}</span>
											<div className='mt-1 flex gap-2'>
												<button className='rounded-md bg-red-400 p-1 text-white'>Xóa thành viên</button>
												<button className='rounded-md bg-red-400 p-1 text-white'>Xóa tài khoản</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Truyện nhóm */}
					<div className='mt-2 w-full'>
						<div className='relative w-full'>
							{/* Show truyện */}
							<div>
								<span className='text-xl font-bold'>Danh sách truyện</span>
								<div className='bottom mb-5 mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6'>
									{novel.map((novel) => (
										<div key={novel.id} className='card rounded-t-lg bg-base-100 shadow-xl'>
											<img src={novel.thumbnail} alt='' className='h-full w-full rounded-t-lg object-cover' />
											<div className='my-3 p-2 text-center'>
												<Link href={`/novel/${novel.slug}`} className='mt-2 text-lg'>
													{novel.name_novel}
												</Link>
												<p className='mt-1'> Tác giả: {novel.author}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
