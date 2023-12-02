import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage, Link, Head } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
export default function Team({ team, status }) {
	const [values, setValues] = useState({
		search: '',
	});
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
	// Handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post('/admin/team', values);
	};
	return (
		<AdminLayout>
			<Head title='Quản lý nhóm' />
			<div>
				<div className='p-2'>
					<h2 className='m-10 text-center text-xl md:text-5xl'>Quản lý nhóm</h2>
				</div>
				<form onSubmit={handleSubmit} className='px-2'>
					{/* {seacrh} */}
					<div className='relative mt-2 flex flex-col'>
						<div className='flex w-full'>
							<input
								id='search'
								type='text'
								onChange={handleChange}
								placeholder='Tên nhóm'
								className=' w-full flex-1 rounded-l-md border px-4  py-2 text-sm outline-none md:py-3  md:text-base'
							/>
							<button
								type='submit'
								className='flex-grow-0 rounded-r-md bg-green-500 px-4 py-2 text-sm font-bold text-white  hover:bg-green-600  md:text-base'
							>
								Tìm kiếm
							</button>
						</div>
					</div>
					{/* {end search} */}
				</form>
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
											<Link className='font-md' href={`/admin/team/${item.slug}`}>
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
											className='btn-xs rounded-sm bg-orange-400 text-white hover:bg-orange-300'
											onClick={() => document.getElementById(`modal_delete_${item.id}`).showModal()}
										>
											Xóa
										</button>
										<dialog id={`modal_delete_${item.id}`} className='modal'>
											<div className='modal-box'>
												<form method='dialog'>
													<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
														✕
													</button>
												</form>
												<h3 className='text-lg font-bold'>Giải tán nhóm!</h3>
												<p className='py-4 text-base font-normal'>
													Bạn có chắc muốn giải tán nhóm {item.team_name}? <br /> Điều này đồng nghĩa với việc
													bạn sẽ xóa mọi dữ liệu liên quan đến nhóm.
												</p>
												<div className='modal-action'>
													<form method='dialog'>
														<button
															onClick={() => {
																router.delete(`/team/${item.slug}/delete`);
															}}
															className='btn mr-2 bg-orange-400 text-white hover:bg-orange-300'
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
