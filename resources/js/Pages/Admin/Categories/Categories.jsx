import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage, Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
export default function Categories({ categories }) {
	const { errors, flash } = usePage().props;
	const [values, setValues] = useState({
		name: '',
	});
	// handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	};
	// handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post('/admin/categories', values);
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
					<h2 className='text-center text-xl md:text-5xl'>Quản lý thể loại</h2>
					<div>
						<form onSubmit={handleSubmit}>
							<div>
								<h1 className='font-medium'>Thêm thể loại</h1>
								<div className='flex items-center justify-between'>
									<label htmlFor='name' className='block text-sm leading-6 text-gray-900'>
										Thể loại
									</label>
								</div>
								<div className='mt-2'>
									<input
										id='name'
										type='text'
										className={`${
											errors && errors.name ? 'mb-2 border-rose-600' : ''
										} block w-full rounded-md border-0 px-5 py-2 text-black ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
										onChange={handleChange}
										value={values.name}
									/>
									{errors && errors.name && <p className='text-sm italic text-red-500'>{errors.name}</p>}
								</div>
							</div>
							<div>
								<button
									type='submit'
									className='my-3 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
								>
									Thêm
								</button>
							</div>
						</form>
					</div>
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
								<th>Thể loại</th>
								<th>Sửa</th>
								<th>Xóa</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((item) => (
								<tr key={item.id}>
									<th>
										<label>
											<input type='checkbox' className='checkbox' />
										</label>
									</th>
									<td>
										<div className='flex items-center space-x-3'>
											<div>
												<div className='font-md'>{item.name}</div>
											</div>
										</div>
									</td>
									<td>
										<Link href={`/admin/categories/detail/${item.id}`} className='btn bg-lime-400 md:btn-xs'>
											Sửa
										</Link>
									</td>
									<th>
										<button
											className='btn bg-red-400 md:btn-xs'
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
																router.delete(`/admin/categories/${item.id}`);
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
