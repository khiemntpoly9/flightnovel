import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import { Link, router } from '@inertiajs/react';

const Novel = ({ novels }) => {
	return (
		<AdminLayout>
			<div className='w-full py-6'>
				<div className='h-7 w-full'>
					<h1 className='text-center text-xl uppercase text-black md:text-5xl'>Truyện</h1>
				</div>
				<div className='p-2'>
					<table className='table'>
						<thead>
							<tr>
								<th>Ảnh bìa</th>
								<th>Tên</th>
								<th>Tác giả</th>
								<th>Họa sĩ</th>
								<th>Nhóm dịch</th>
								<th>Xóa</th>
							</tr>
						</thead>
						<tbody>
							{novels.map((novel) => (
								<tr key={novel.id} className='mt-3'>
									<td className='shadow-xl'>
										<Link href={`/novel/${novel.slug}`} className='hover:text-red-500'>
											<figure className='h-40 md:h-44 lg:h-40 xl:h-64'>
												<img className='h-full w-full object-cover' src={novel.thumbnail} alt='thumbnail' />
											</figure>
										</Link>
									</td>
									<td>
										<Link href={`/novel/${novel.slug}`} className='hover:text-red-500'>
											<div className='p-2'>{novel.name_novel}</div>
										</Link>
									</td>
									<td>
										<div className='p-2'>{novel.author}</div>
									</td>
									<td>
										<div className='p-2'>{novel.illustrator}</div>
									</td>
									<td>
										<div className='p-2'>{novel.team.team_name}</div>
									</td>
									<td>
										<button
											className='btn btn-error right-0 w-20 md:btn-xs'
											onClick={() => document.getElementById(`modal_delete_${novel.id}`).showModal()}
										>
											Xóa
										</button>
										<dialog id={`modal_delete_${novel.id}`} className='modal'>
											<div className='modal-box'>
												<form method='dialog'>
													<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
														✕
													</button>
												</form>
												<h3 className='text-lg font-bold'>Xoá truyện!</h3>
												<p className='py-4 text-base font-normal'>
													Bạn có chắc muốn xoá truyện này? {novel.name_novel}
												</p>
												<div className='modal-action'>
													<form method='dialog'>
														<button
															onClick={() => {
																router.delete(`/admin/novel/${novel.slug}`);
															}}
															className='btn mr-2 bg-red-600 text-white hover:bg-red-500'
														>
															Xoá
														</button>
														<button className='btn'>Đóng</button>
													</form>
												</div>
											</div>
										</dialog>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</AdminLayout>
	);
};

export default Novel;
