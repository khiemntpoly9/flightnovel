import 'animate.css';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
export default function SideBar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return (
		<div className='relative md:flex'>
			{/* mobile menubar */}
			<div className='bg-blue-800 text-blue-100 md:hidden'>
				{/* nav */}
				<button
					className='mobile-menu-button p-4 focus:bg-blue-700 focus:outline-none'
					onClick={toggleSidebar}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='h-8 w-8'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				</button>
			</div>
			{/* menu sidebar */}
			<div className=''>
				{isSidebarOpen && (
					<div className='relative h-64 w-full  md:hidden '>
						{/* Menu Items */}
						<div className='absolute left-0 z-50 w-full'>
							<ul className='menu w-full rounded-md bg-base-100 shadow'>
								<li>
									<Link href={route('admin.home')}>Thống kê</Link>
								</li>
								<li>
									<Link href={route('admin.user')}>Tài khoản</Link>
								</li>
								<li>
									<Link href={route('admin.team')}>Nhóm</Link>
								</li>
								<li>
									<Link href={route('admin.novel')}>Truyện</Link>
								</li>
								<li>
									<Link href='/'>Trang chủ</Link>
								</li>
								<li>
									<Link method='post' as='button' href={route('logout')}>
										Đăng xuất
									</Link>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>

			{/* sidebar */}
			<div
				className={`trasition absolute inset-y-0 left-0 -translate-x-full transform space-y-6 bg-blue-800 px-2 py-7 text-blue-100 duration-200 md:relative md:translate-x-0 ${
					open ? 'w-64' : 'w-16'
				}`}
			>
				{/* logo */}
				<div>
					<div className='flex flex-row items-center space-x-2 px-3'>
						<a href='#' className=' text-white'>
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
									d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
								/>
							</svg>
						</a>
						<span className={`text-2xl ${!open && 'scale-0'}`}>Admin</span>
					</div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className={`absolute top-9 h-6 w-6 cursor-pointer rounded-full border border-blue-800 bg-white text-blue-800 md:-right-3 ${
							!open && 'rotate-180'
						}`}
						onClick={() => setOpen(!open)}
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
					</svg>
				</div>

				{/* nav */}
				<nav>
					<ul className='space-y-2'>
						<li>
							<div
								className={`collapse collapse-arrow mb-1 rounded-md bg-blue-800 text-white hover:bg-blue-700`}
							>
								{/* <input type='checkbox' className={`${!open && 'hidden'}`} /> */}
								<div className=' flex items-center gap-4  px-3 py-4'>
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
											d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
										/>
									</svg>
									<a
										className={`block rounded transition duration-200 group-hover:text-white ${
											!open && 'hidden'
										}`}
										href={route('admin.home')}
									>
										Thống kê
									</a>
								</div>
							</div>
						</li>
						<li className='group flex items-center gap-4 rounded px-3 py-4 hover:bg-blue-700 '>
							<Link href={route('admin.user')}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='h-6 w-6 '
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
									/>
								</svg>
							</Link>
							<Link
								href={route('admin.user')}
								className={`block  transition duration-200  group-hover:text-white ${!open && 'hidden'}`}
							>
								Tài khoản
							</Link>
						</li>
						<li className='group flex items-center gap-4 rounded px-3 py-4 hover:bg-blue-700'>
							<Link href={route('admin.categories')}>
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
										d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
									/>
								</svg>
							</Link>
							<Link
								href={route('admin.categories')}
								className={`block transition duration-200 group-hover:text-white ${!open && 'hidden'}`}
							>
								Thể loại
							</Link>
						</li>
						<li className='group flex items-center gap-4 rounded px-3 py-4 hover:bg-blue-700 '>
							<Link href={route('admin.team')}>
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
										d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
									/>
								</svg>
							</Link>
							<Link
								href={route('admin.team')}
								className={`block transition duration-200 group-hover:text-white ${!open && 'hidden'}`}
							>
								Nhóm
							</Link>
						</li>
						<li className='group flex items-center gap-4 rounded px-3 py-4 hover:bg-blue-700 '>
							<Link href={route('admin.novel')}>
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
										d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
									/>
								</svg>
							</Link>
							<Link
								className={`block  transition duration-200  group-hover:text-white ${!open && 'hidden'}`}
								href={route('admin.novel')}
							>
								Truyện
							</Link>
						</li>
						<li className='group flex items-center gap-4 rounded px-3 py-4 hover:bg-blue-700'>
							<Link href='/'>
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
							</Link>
							<Link
								href='/'
								className={`block transition duration-200 group-hover:text-white ${!open && 'hidden'}`}
							>
								Trang chủ
							</Link>
						</li>
						<li className='group flex items-center gap-4 rounded px-3 py-4 hover:bg-blue-700'>
							<Link method='post' as='button' href={route('logout')}>
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
										d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
									/>
								</svg>
							</Link>
							<Link
								method='post'
								as='button'
								href={route('logout')}
								className={`block transition duration-200 group-hover:text-white ${!open && 'hidden'}`}
							>
								Đăng xuất
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
