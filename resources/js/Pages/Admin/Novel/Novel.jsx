import AdminLayout from '@/Layouts/AdminLayout';
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

const Novel = ({ novels, categories }) => {
	const [values, setValues] = useState({
		search: '',
		select: '',
		categories: [],
	});
	// Handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	};
	// Handle change checkbox
	const handleCheckbox = (e) => {
		const cateId = e.target.id;
		const isChecked = e.target.checked;

		// Lấy mảng categories hiện tại
		const updateCategories = [...values.categories];

		if (isChecked) {
			// Nếu được check thì thêm id đó vào mảng
			updateCategories.push(cateId);
		} else {
			// Nếu không được check thì xóa id đó trong mảng
			const index = updateCategories.indexOf(cateId);
			if (index !== -1) {
				updateCategories.splice(index, 1);
			}
		}
		setValues((values) => ({
			...values,
			categories: updateCategories,
		}));
	};
	// Handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post('/admin/novel', values);
	};
	return (
		<AdminLayout>
			<div className='w-full py-6'>
				<div className='h-7 w-full'>
					<h1 className='text-center text-xl uppercase text-black md:text-5xl'>Truyện</h1>
				</div>
				<form onSubmit={handleSubmit} className='mt-10 px-2'>
					{/* {seacrh} */}
					<div className='relative mt-2 flex flex-col'>
						<div className='flex w-full'>
							<input
								id='search'
								type='text'
								onChange={handleChange}
								placeholder='Tên Tác Phẩm, Tên Tác Giả, Họa Sĩ'
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
					{/* Tìm kiếm nâng cao */}
					<div className='mt-2'>
						{/* tìm kiếm input */}
						<div className='md:flex md:flex-row md:justify-between'>
							{/* tình trạng */}
							<div className='mt-2'>
								<label htmlFor='hoasi' className='text-base font-bold'>
									Tình trạng
								</label>
								<select
									id='select'
									onChange={handleCheckbox}
									className='select select-accent select-sm mt-1 w-full max-w-xs md:select-md'
								>
									<option value={0}>Tất cả</option>
									<option value={1}>Đang tiến hành</option>
									<option value={2}>Hoàn thành</option>
									<option value={3}>Tạm ngưng</option>
								</select>
							</div>
						</div>
						{/* tìm kiếm checkbox */}
						<div className='mt-2'>
							<div className='text-base font-bold'>Thể loại</div>
							<div className='mt-2'>
								{/* checkbox ngang 3 */}
								<div className='grid grid-flow-row grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5'>
									{categories.map((category) => (
										<div key={category.id} className='mb-4 flex items-center'>
											<input
												id={category.id}
												type='checkbox'
												name='categories'
												onChange={handleCheckbox}
												className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
											/>
											<label
												htmlFor={category.id}
												className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
											>
												{category.name}
											</label>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</form>
				<div className='overflow-x-auto p-2'>
					<table className='table table-auto'>
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
									<td>
										<Link href={`/novel/${novel.slug}`}>
											<img
												className='h-24 w-20 md:h-44 md:w-40 lg:h-72 lg:w-44'
												src={novel.thumbnail}
												alt='thumbnail'
											/>
										</Link>
									</td>
									<td>
										<Link href={`/novel/${novel.slug}`} className='hover:text-blue-400'>
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
													Bạn có chắc muốn xoá truyện "{novel.name_novel}"?
												</p>
												<div className='modal-action'>
													<form method='dialog'>
														<button
															onClick={() => {
																router.delete(`delete/admin/novel/${novel.id}`);
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
