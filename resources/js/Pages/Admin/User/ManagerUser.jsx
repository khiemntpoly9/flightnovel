import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage, Link } from '@inertiajs/react';
import moment from 'moment/moment';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
export default function ManagerUser({ users }) {
	const { errors, flash } = usePage().props;
	const [values, setValues] = useState({
		search: '',
	});
	console.log(users);
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
		router.post('/admin/user', values);
	};
	// Toast
	useEffect(() => {
		if (flash.success) {
			toast.success(flash.success, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [flash.success]);
	return (
		<AdminLayout>
			<div>
				<div className='p-2'>
					<h2 className='m-10 text-center text-xl md:text-5xl'>Quản lý tài khoản</h2>
				</div>
				<form onSubmit={handleSubmit} className='px-2'>
					{/* {seacrh} */}
					<div className='relative mt-2 flex flex-col'>
						<div className='flex w-full'>
							<input
								id='search'
								type='text'
								onChange={handleChange}
								placeholder='Tên user, email'
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
				<div className='mt-2  overflow-x-auto'>
					<table className='table table-auto  '>
						{/* head */}
						<thead>
							<tr>
								<th>
									<label>
										<input type='checkbox' className='checkbox' />
									</label>
								</th>
								<th>Avatar</th>
								<th>Tên user</th>
								<th>Email</th>
								<th>Vai trò</th>
								<th>Ngày tạo</th>
								<th>Xóa</th>
							</tr>
						</thead>
						<tbody>
							{users.map((item) => (
								<tr key={item.id}>
									<th>
										<label>
											<input type='checkbox' className='checkbox' />
										</label>
									</th>
									<td>
										<div className='flex items-center space-x-3'>
											<img
												className='md:h-22 md:w-22 h-10 w-10 rounded-full lg:h-28 lg:w-28'
												src={item.avatar}
												alt=''
											/>
										</div>
									</td>
									<td>
										<div className='flex items-center space-x-3'>
											<div className='text-sm md:text-base'>{item.name}</div>
										</div>
									</td>
									<td>
										<div className='flex items-center space-x-3'>
											<div className='text-sm md:text-base'>{item.email}</div>
										</div>
									</td>
									<td>
										<div className='flex items-center space-x-3'>
											<div className='text-sm md:text-base'>{item.role.name_role}</div>
										</div>
									</td>
									<td>
										<div className='flex items-center space-x-3'>
											<div className='text-sm md:text-base'>
												{moment(item.created_at).format('DD/MM/YYYY')}
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
												<h3 className='text-lg font-bold'>Xoá danh mục!</h3>
												<p className='py-4 text-base font-normal'>
													Bạn có chắc muốn xoá danh mục {item.name}
												</p>
												<div className='modal-action'>
													<form method='dialog'>
														<button
															onClick={() => {
																router.delete(`/admin/user-delete/${item.id}`);
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
