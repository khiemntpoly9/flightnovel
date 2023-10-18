import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import moment from 'moment/moment';
import { Link, Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Edit({ auth }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const { errors } = usePage().props;
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('avatar', selectedFile);
		router.post(route('profile.avatar'), formData);
	};
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={<h2 className='text-xl font-semibold leading-tight text-gray-800'>Profile</h2>}
		>
			<Head title='Profile' />
			<div className='container mx-auto mt-4 w-10/12'>
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
										d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
									/>
								</svg>
								User
							</a>
						</li>
					</ul>
				</div>
				{/* End Breadcrumbs */}
				<div className='mt-2'>
					{/* avatar */}
					<div className='mb-5 flex items-center justify-center '>
						<div className='relative'>
							<img
								src={auth.user.avatar}
								alt=''
								className='h-28 w-28 rounded-full outline outline-4 outline-offset-2 outline-gray-300 md:h-44 md:w-44'
							/>
							<div className='absolute bottom-2 right-1 cursor-pointer rounded-full bg-gray-300 hover:bg-gray-500 hover:text-white focus:outline-none'>
								<button
									className='cursor-pointer rounded-full bg-gray-300 p-2 hover:bg-gray-500'
									onClick={() => document.getElementById('my_modal_4').showModal()}
								>
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
											d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
										/>
									</svg>
								</button>
							</div>
							{/* Modal change Avatar */}
							<dialog id='my_modal_4' className='modal'>
								<div className='modal-box w-4/12 max-w-5xl '>
									<form method='dialog'>
										{/* if there is a button in form, it will close the modal */}
										<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
									</form>
									<h3 className='text-lg font-bold'>Thay đổi Avatar</h3>
									<form onSubmit={handleSubmit} className=' text-center' encType='multipart/form-data'>
										<input
											type='file'
											className='file-input file-input-bordered mt-3 w-full max-w-xs'
											onChange={(e) => setSelectedFile(e.target.files[0])}
										/>
										{errors.avatar && <p className='mt-2 text-sm italic text-red-500'>{errors.avatar}</p>}
										<button className='btn btn-success m-2'>Lưu</button>
									</form>
								</div>
							</dialog>
						</div>
					</div>
					{/* end avatar */}
					<div className=' md:m-auto md:w-96 lg:m-auto'>
						{/* thanh công cụ */}
						<div className='flex space-x-20 '>
							<div className='tt flex-1 rounded-tr-lg bg-gray-300 '>
								<div className='break-words px-1 py-1 text-center text-sm font-normal text-black  md:text-base'>
									Thông tin tài khoản
								</div>
							</div>
							<Link href={route('profile.create')}>
								<div className='flex items-center'>
									<div className='text-sm md:text-base'>Chỉnh sửa</div>
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
											d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
										/>
									</svg>
								</div>
							</Link>
						</div>
						{/* end thanh công cụ */}
						<div className='mb-5 mt-5 '>
							<div className='py-1 text-sm  md:text-base'>Tên tài khoản: {auth.user.name}</div>
							<div className='py-1 text-sm md:text-base'>Email: {auth.user.email}</div>
							<div className='py-1  text-sm md:text-base'>
								Tham gia: {moment(auth.user.created_at).format('DD/MM/YYYY - HH:mm:ss')}
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
