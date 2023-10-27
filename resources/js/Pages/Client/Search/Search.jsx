import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
export default function Search({ auth, categories, novel }) {
	const [values, setValues] = useState({
		search: '',
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
	console.log(values);
	// Handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post('/search', values);
	};
	return (
		<DefaultLayout auth={auth}>
			<div className='container mx-auto w-10/12'>
				{/* Breadcrumbs */}
				<div className='breadcrumbs text-sm'>
					<ul>
						<li>
							<Link href='/' className='rounded	bg-zinc-700 p-2 text-white' style={{ textDecoration: 'none' }}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='h-6 w-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
									/>
								</svg>
								Trang chủ
							</Link>
						</li>
						<li>
							<a style={{ textDecoration: 'none' }}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='h-6 w-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
									/>
								</svg>
								Tìm kiếm
							</a>
						</li>
					</ul>
				</div>
				{/* End Breadcrumbs */}
				<form onSubmit={handleSubmit}>
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
								<select className='select select-accent select-sm mt-1 w-full max-w-xs md:select-md'>
									<option>Tất cả</option>
									<option value={0}>Đang tiến hành</option>
									<option value={1}>Hoàn thành</option>
									<option value={2}>Tạm ngưng</option>
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

				{/* end Tìm kiếm nâng cao */}
				<hr className='my-8 h-px  border-2 bg-gray-200  dark:bg-gray-700 ' />
				<div className='mb-10 mt-3'>
					<div className='bottom grid grid-cols-3 gap-2 text-center font-bold sm:grid-cols-4 lg:grid-cols-6'>
						{novel?.map((novel, index) => (
							<div key={index} className='card bg-base-100 shadow-xl'>
								<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
									<img className='h-full w-full object-cover' src={novel.thumbnail} alt='thumbnail' />
								</figure>
								<div className='p-2 text-center'>
									<Link href={`/novel/${novel.slug}`} className='hover:text-red-500'>
										{novel.name_novel}
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
