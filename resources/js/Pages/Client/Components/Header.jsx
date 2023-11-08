import { Link } from '@inertiajs/react';
import Logo from '../../../../images/logo.svg';

export default function Header({ auth, notify }) {
	// Set user
	const user = auth || null;
	return (
		<>
			<header className='mb-4 bg-header-a shadow-md'>
				<div className='navbar mx-auto w-10/12'>
					<div className='flex-1'>
						{/* Logo */}
						<Link href='/' className='text-xl normal-case'>
							<img src={Logo} alt='Logo' width={40} />
						</Link>
						<div className='hidden lg:block'>
							<ul className='menu menu-horizontal'>
								<li>
									<Link href={route('novel.list')} className='text-white'>
										Danh sách truyện
									</Link>
								</li>
							</ul>
						</div>
					</div>
					{/*  */}
					<div className='flex-none gap-2'>
						{/* Search */}
						<div>
							<label tabIndex={0} className='btn btn-circle btn-ghost'>
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
							</label>
						</div>
						{/* Notify */}
						<div className='dropdown dropdown-end'>
							<label tabIndex={0} className='btn btn-circle btn-ghost'>
								<div className='indicator'>
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
									<span className='badge indicator-item badge-secondary bg-red-600 text-white'>
										{notify ? notify.length : '0'}
									</span>
								</div>
							</label>
							{/*  */}
							<div
								tabIndex={0}
								className='card dropdown-content card-compact z-[99] mt-3 w-60 bg-base-100 shadow'
							>
								<div className='card-body'>
									<ul>
										{notify?.map((item, index) => (
											<li key={index}>
												<span>
													Truyện {item.data.novel} vừa cập nhật chap mới! {item.data.chap}
												</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						{/* User */}
						<div className='dropdown-end dropdown'>
							<label tabIndex={0} className='avatar btn btn-circle btn-ghost'>
								<div className='w-10 rounded-full'>
									{user ? (
										<img src={user.avatar} alt='avatar' />
									) : (
										<div className='grid h-full place-content-center'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='#fff'
												className='h-7 w-7'
												stroke='#fff'
											>
												<path
													fillRule='evenodd'
													d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
									)}
								</div>
							</label>
							{/*  */}
							{user ? (
								<ul
									tabIndex={0}
									className='menu dropdown-content rounded-box menu-sm z-[99] mt-3 w-60 bg-base-100 p-2 shadow'
								>
									{/* <li>
										<a className='justify-between'>
											Profile
											<span className='badge'>New</span>
										</a>
									</li> */}
									{user.role.short_role === 'admin' ? (
										<li>
											<Link href={route('admin.home')}>Trang Quản Trị</Link>
										</li>
									) : (
										<></>
									)}
									<li>
										<Link href={route('profile.edit')}>Trang cá nhân</Link>
									</li>
									<li>
										<Link href={route('follow.index')}>Truyện theo dõi</Link>
									</li>
									<li>
										<Link href={route('team.index')}>Nhóm dịch</Link>
									</li>
									<li>
										<Link method='post' as='button' href={route('logout')}>
											Đăng xuất
										</Link>
									</li>
								</ul>
							) : (
								<ul
									tabIndex={0}
									className='menu dropdown-content rounded-box menu-sm z-[99] mt-3 w-52 bg-base-100 p-2 shadow'
								>
									<li>
										<Link href='/login'>Đăng nhập</Link>
									</li>
									<li>
										<Link href='/register'>Đăng ký</Link>
									</li>
								</ul>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
