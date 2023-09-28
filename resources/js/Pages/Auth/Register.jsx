import { useEffect } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Head, Link, useForm } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

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
									<input
										id='password'
										type='password'
										name='password'
										value={data.password}
										autoComplete='new-password'
										className={`${
											errors && errors.password ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
										onChange={(e) => setData('password', e.target.value)}
										required
									/>
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
									<input
										id='password_confirmation'
										type='password'
										name='password_confirmation'
										value={data.password_confirmation}
										autoComplete='new-password'
										className={`${
											errors && errors.password ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
										onChange={(e) => setData('password_confirmation', e.target.value)}
									/>
									{/* {errors && errors.password && (
										<p className='text-sm italic text-red-500'>{errors.password}</p>
									)} */}
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
						<div className='flex '>
							{/* Nút đăng nhập bằng Facebook */}
							<a
								href='auth/facebook'
								className='mx-2 mt-4 flex w-1/2 items-center justify-center rounded-md bg-blue-500 px-1 py-2 text-white shadow-md hover:bg-blue-600'
							>
								<FaFacebook className='mr-2' />
								Facebook
							</a>

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
