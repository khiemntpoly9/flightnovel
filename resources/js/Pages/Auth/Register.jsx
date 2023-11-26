import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Head, Link, useForm } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation');
		};
	}, []);

	const submit = (e) => {
		e.preventDefault();
		post(route('register'));
	};
	return (
		<DefaultLayout>
			<Head title='Đăng ký' />
			<div className='container mx-auto w-10/12 bg-white'>
				<div className='flex min-h-full flex-1 flex-col justify-center lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Đăng ký</h2>
					</div>
					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form onSubmit={submit}>
							{/* Full name */}
							<div className='mb-2'>
								<label htmlFor='name' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
									Họ và tên
								</label>
								<div>
									<input
										id='name'
										name='name'
										value={data.name}
										autoComplete='name'
										onChange={(e) => setData('name', e.target.value)}
										className={`${
											errors && errors.name ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
										required
									/>
									{errors && errors.name && <p className='text-sm italic text-red-500'>{errors.name}</p>}
								</div>
							</div>
							{/* Email */}
							<div className='mb-2'>
								<label htmlFor='email' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
									Tài khoản Email
								</label>
								<div>
									<input
										id='email'
										name='email'
										type='email'
										value={data.email}
										autoComplete='username'
										className={`${
											errors && errors.email ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
										onChange={(e) => setData('email', e.target.value)}
										required
									/>
									{errors && errors.email && <p className='text-sm italic text-red-500'>{errors.email}</p>}
								</div>
							</div>
							{/* Password */}
							<div className='mb-2'>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='password'
										className='mb-2 block text-sm font-medium leading-6 text-gray-900'
									>
										Mật khẩu
									</label>
								</div>
								<div>
									<div
										className={`flex gap-1 ${
											errors && errors.password ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									>
										<input
											id='password'
											type={showPassword ? 'text' : 'password'}
											name='password'
											value={data.password}
											autoComplete='new-password'
											className='w-full border-none outline-none focus:outline-none'
											onChange={(e) => setData('password', e.target.value)}
											required
										/>
										<div onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? (
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
														d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
													/>
												</svg>
											) : (
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
														d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
													/>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
													/>
												</svg>
											)}
										</div>
									</div>
									{errors && errors.password && (
										<p className='text-sm italic text-red-500'>{errors.password}</p>
									)}
								</div>
							</div>
							{/* Repeact Password */}
							<div className='mb-2'>
								<div className='flex items-center justify-between'>
									<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
										Xác nhận mật khẩu
									</label>
								</div>
								<div>
									<div
										className={`flex gap-1 ${
											errors && errors.password ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									>
										<input
											id='password_confirmation'
											type={showConfirmPassword ? 'text' : 'password'}
											name='password_confirmation'
											value={data.password_confirmation}
											autoComplete='new-password'
											className='w-full border-none outline-none focus:outline-none'
											onChange={(e) => setData('password_confirmation', e.target.value)}
										/>
										<div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
											{showConfirmPassword ? (
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
														d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
													/>
												</svg>
											) : (
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
														d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
													/>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
													/>
												</svg>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='mt-4'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
								>
									Đăng ký
								</button>
							</div>
						</form>
						<p className='mt-10 text-center text-sm text-gray-500'>
							Bạn đã có tài khoản?{' '}
							<Link
								href={route('login')}
								className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
							>
								Đăng nhập ngay
							</Link>
						</p>
						<hr />
						<p className='mt-3 text-center text-sm text-gray-500'>Hoặc đăng ký bằng</p>
						<div className='flex justify-center'>
							{/* Nút đăng nhập bằng Google */}
							<a
								href='auth/google'
								className='mx-2 mt-4 flex w-1/2 items-center justify-center rounded-md bg-red-500 px-1 py-2 text-white shadow-md hover:bg-red-600'
							>
								<FaGoogle className='mr-2' />
								Google
							</a>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
