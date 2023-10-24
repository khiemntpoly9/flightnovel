import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
export default function Search({ auth }) {
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
				<form>
					{/* {seacrh} */}
					<div className='relative mt-2 flex flex-col'>
						<div className='flex w-full'>
							<input
								type='text'
								placeholder='Tên Tác Phẩm...'
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
							<div className='md:w-8/12 lg:w-9/12'>
								{/* tác giả */}
								<div className='mt-2'>
									<label className='text-base font-bold'>Tác giả</label>
									<input
										type='text'
										placeholder='Có thể bỏ trống.'
										className=' mt-1 w-full flex-1 rounded border px-4 py-2  text-sm outline-none  md:py-3  md:text-base'
									/>
								</div>
								{/* họa sĩ*/}
								<div className='mt-2'>
									<label className='text-base font-bold'>Họa sĩ</label>
									<input
										type='text'
										placeholder='Có thể bỏ trống.'
										className=' mt-1 w-full flex-1 rounded border px-4  py-2 text-sm outline-none  md:py-3  md:text-base'
									/>
								</div>
							</div>
							{/* tình trạng */}
							<div className='mt-2'>
								<label htmlFor='hoasi' className='text-base font-bold'>
									Tình trạng
								</label>
								<select className='select select-accent select-sm mt-1 w-full max-w-xs md:select-md'>
									<option defaultValue={0}>Tất cả</option>
									<option value={1}>Đang tiến hành</option>
									<option value={2}>Tạm ngưng</option>
									<option value={3}>Hoàn thành</option>
								</select>
							</div>
						</div>
						{/* tìm kiếm checkbox */}
						<div className='mt-2'>
							<div className='text-base font-bold'>Thể loại</div>
							<div className='mt-2'>
								{/* checkbox ngang 3 */}
								<div className='grid grid-flow-row grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5'>
									<div className='mb-4 flex items-center'>
										<input
											id='action'
											type='checkbox'
											className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
										/>
										<label
											htmlFor='action'
											className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
										>
											Action
										</label>
									</div>
									<div className='mb-4 flex items-center'>
										<input
											id='action2'
											type='checkbox'
											className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
										/>
										<label
											htmlFor='action2'
											className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
										>
											Action2
										</label>
									</div>
									<div className='mb-4 flex items-center'>
										<input
											id='action3'
											type='checkbox'
											className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
										/>
										<label
											htmlFor='action3'
											className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
										>
											Action3
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>

				{/* end Tìm kiếm nâng cao */}
				<hr className='my-8 h-px  border-2 bg-gray-200  dark:bg-gray-700 ' />
				<div className='mb-10 mt-3'>
					<div className='bottom grid grid-cols-3 gap-2 text-center font-bold sm:grid-cols-4 lg:grid-cols-6'>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
								className=''
							/>
							<div className='name'>
								<h2>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2>konosuba</h2>
							</div>
						</div>
						<div className='card'>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2>konosuba</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
