import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage, Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
export default function Team({ team }) {
	return (
		<AdminLayout>
			<div>
				<div className='p-2'>
					<h2 className='m-10 text-center text-xl md:text-5xl'>Quản lý nhóm</h2>
				</div>
				{/* Table */}
				<div className='overflow-x-auto '>
					<table className='table table-fixed '>
						{/* head */}
						<thead>
							<tr>
								<th>
									<label>
										<input type='checkbox' className='checkbox' />
									</label>
								</th>
								<th>Tên nhóm</th>
								<th>Chi tiết</th>
								<th>Xóa</th>
							</tr>
						</thead>
						<tbody>
							{team.map((item) => (
								<tr key={item.id}>
									<th>
										<label>
											<input type='checkbox' className='checkbox' />
										</label>
									</th>
									<td>
										<div className='flex items-center space-x-3'>
											<Link className='font-md' href={`/admin/team/detail/${item.id}`}>
												{item.team_name}
											</Link>
										</div>
									</td>
									<td>
										<div className='flex items-center space-x-3'>
											<div>
												<div
													className='font-md'
													dangerouslySetInnerHTML={{ __html: `${item.team_detail}` }}
												></div>
											</div>
										</div>
									</td>
									<th>
										<button
											className='btn bg-red-400 md:btn-xs'
											onClick={() =>
												document.getElementById(`modal_delete_${item.id_categories}`).showModal()
											}
										>
											Xóa
										</button>
										<dialog id={`modal_delete_${item.id_categories}`} className='modal'>
											<div className='modal-box'>
												<form method='dialog'>
													<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
														✕
													</button>
												</form>
												<h3 className='text-lg font-bold'>Xoá danh mục!</h3>
												<p className='py-4 text-base font-normal'>
													Bạn có chắc muốn xoá danh mục {item.name}
												</p>
												<div className='modal-action'>
													<form method='dialog'>
														<button
															onClick={() => {
																router.delete(`/admin/categories/${item.id_categories}`);
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
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* Table */}
			</div>
		</AdminLayout>
	);
}
