import Pagination from '@/Components/Pagination';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link } from '@inertiajs/react';
export default function TeamDetail({ auth, team, novel, team_member }) {
	return (
		<DefaultLayout auth={auth}>
			<Head title={`Nhóm ${team.team_name}`} />
			<div className='container mx-auto w-10/12'>
				<h1 className='m-4 p-2 text-center text-3xl font-bold'>Thông tin nhóm</h1>
				<div className='flex flex-col lg:flex-row'>
					{/* left */}
					<div className='head-left w-full lg:w-7/12'>
						<div className='mb-5'>
							<strong>Tên nhóm: </strong> <span>{team.team_name}</span> <br />
							<strong>Chi tiết: </strong>{' '}
							<span dangerouslySetInnerHTML={{ __html: `${team.team_detail}` }}></span>
						</div>
					</div>
					{/* right */}
					<div className='head-right w-full lg:w-3/12'>
						<span className='text-xl font-bold'>Danh sách thành viên</span>
						<div className='mt-2 flex gap-2'>
							<div className=' overflow-x-auto'>
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
				<div className='relative w-full py-6'>
					{/* Show truyện */}
					<div>
						<span className='text-xl font-bold'>Danh sách truyện</span>
						<div className='bottom mb-5 mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6'>
							{novel.data.map((novel) => (
								<div key={novel.id} className='card rounded-t-md bg-base-100 shadow-xl'>
									<img src={novel.thumbnail} alt='' className='h-full w-full rounded-t-md object-cover' />
									<div className='my-3 p-2'>
										<Link href={`/novel/${novel.slug}`} className='mt-2 text-lg font-semibold'>
											{novel.name_novel}
										</Link>
										<p className='mt-1 font-semibold'> Tác giả: {novel.author}</p>
									</div>
								</div>
							))}
						</div>
						<div className='mt-3'>
							{novel.links && novel.links.length > 3 && <Pagination links={novel.links} />}
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
