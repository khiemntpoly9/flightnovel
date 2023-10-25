import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Logo from '../../../../images/logo.svg';

export default function Header({ auth }) {
	const [isMenuOpenBtn, setIsMenuOpenBtn] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isUserOpen, setIsUserOpen] = useState(false);

	const statusMenu = () => {
		// fix user
		setIsUserOpen(false);
		if (!isMenuOpenBtn) {
			setIsMenuOpenBtn(true);
			setIsMenuOpen(true);
		} else {
			setIsMenuOpenBtn(false);
			setIsMenuOpen(false);
		}
	};

	// set status user
	const statusUser = () => {
		// fix menu
		setIsMenuOpenBtn(false);
		setIsMenuOpen(false);
		if (!isUserOpen) {
			setIsUserOpen(true);
		} else {
			setIsUserOpen(false);
		}
	};

	// Set user
	const user = auth || null;

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width >= 1024) {
				setIsMenuOpenBtn(false);
				setIsMenuOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<>
			<header className='mb-4 bg-header-a shadow-md'>
				<div className='navbar mx-auto flex w-10/12 justify-between'>
					<div className='flex-start'>
						{/* Menu new */}
						<div className='dropdown lg:hidden'>
							<button className='btn btn-circle btn-ghost'>
								{!isMenuOpenBtn ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='#fff'
										className='h-6 w-6'
										onClick={() => statusMenu()}
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='#fff'
										className='h-6 w-6'
										onClick={() => statusMenu()}
									>
										<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
									</svg>
								)}
							</button>
						</div>
						{/* Logo */}
						<div className='flex'>
							<Link href='/' className='text-xl normal-case'>
								<img src={Logo} alt='Logo' width={40} />
							</Link>
							<div className='nav-desktop hidden lg:block'>
								<ul className='menu menu-horizontal'>
									<li>
										<a className='text-white' href='#'>
											Danh sách truyện
										</a>
									</li>

									<li>
										<a className='text-white' href='#'>
											Cộng đồng
										</a>
									</li>
									<li>
										<a className='text-white' href='#'>
											Hướng dẫn
										</a>
									</li>
									<li>
										<a className='text-white' href='#'>
											FAQ
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* Navbar End */}
					<div className='w-auto'>
						{/* search */}
						<div className='flex gap-4'>
							<Link href={route('search.index')}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='#fff'
									className='h-7 w-7'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
									/>
								</svg>
							</Link>
							{/* heart */}
							<div className='flex content-center'>
								<a href='#'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='#fff'
										className='h-7 w-7'
										stroke='#fff'
									>
										<path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
									</svg>
								</a>
							</div>
							{/* bell */}
							<div className='indicator'>
								<span className='badge indicator-item badge-secondary bg-red-600 text-white'>3</span>
								<button>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='#fff'
										className='h-7 w-7'
										stroke='#fff'
									>
										<path
											fillRule='evenodd'
											d='M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z'
											clipRule='evenodd'
										/>
									</svg>
								</button>
							</div>
							{/* user */}
							<div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='#fff'
									className='h-7 w-7'
									stroke='#fff'
									onClick={() => statusUser()}
								>
									<path
										fillRule='evenodd'
										d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				{/* Hidden */}
				<div className='relative flex w-full justify-between md:mx-auto md:w-10/12 lg:mx-auto lg:w-10/12'>
					{/* Menu */}
					<div className={`absolute ${isMenuOpen ? 'block' : 'hidden'} left-0 z-50 w-full md:w-1/2`}>
						<ul className='menu z-[99] w-auto bg-base-100 p-2 shadow md:rounded-md'>
							<li>
								{/* tìm kiếm */}
								<div className='search_box flex flex-row gap-2'>
									<div className='w-full'>
										<input
											className='h-full w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500'
											placeholder='Nhập tên cần tìm ...'
											type='text'
										/>
									</div>
									<div className=''>
										<Link href={route('search.index')}>
											<button className='btn bg-green-400 text-white'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth={1.5}
													stroke='white'
													className='h-6 w-6'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
													/>
												</svg>
											</button>
										</Link>
									</div>
								</div>
							</li>

							<li>
								<a>Danh sách truyện</a>
							</li>
							<li>
								<a>Cộng đồng</a>
							</li>
							<li>
								<a>Hướng dẫn</a>
							</li>
							<li>
								<a>FAQ</a>
							</li>
						</ul>
					</div>
					{/* User */}
					<div
						className={`border-md absolute z-50 ${
							isUserOpen ? 'block' : 'hidden'
						} w-full md:right-0 md:w-1/4 md:rounded-md lg:right-0 lg:w-1/4`}
					>
						{user ? (
							<ul className='menu z-[99] w-auto bg-base-100 p-2 shadow md:rounded-md'>
								{user.role.short_role === 'admin' ? (
									<li onClick={() => statusUser()}>
										<Link href={route('admin.home')}>Trang Quản Trị</Link>
									</li>
								) : (
									<></>
								)}
								<li onClick={() => statusUser()}>
									<Link href={route('profile.edit')}>Trang cá nhân</Link>
								</li>
								<li onClick={() => statusUser()}>
									<Link href='/profile'>Hệ thống</Link>
								</li>
								<li onClick={() => statusUser()}>
									<Link href='/team'>Nhóm dịch</Link>
								</li>
								<li
									onClick={() => {
										statusUser();
									}}
								>
									<Link method='post' as='button' href={route('logout')}>
										Đăng xuất
									</Link>
								</li>
							</ul>
						) : (
							<ul className='menu z-[99] w-auto bg-base-100 p-2 shadow md:rounded-md'>
								<li onClick={() => statusUser()}>
									<Link href='/login'>Đăng nhập</Link>
								</li>
								<li onClick={() => statusUser()}>
									<Link href='/register'>Đăng ký</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</header>
		</>
	);
}
