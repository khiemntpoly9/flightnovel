import { useEffect } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Login({ auth, status, canResetPassword }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
		password: '',
		remember: false,
	});

	useEffect(() => {
		return () => {
			reset('password');
		};
	}, []);

	const submit = (e) => {
		e.preventDefault();
		post(route('login'));
	};
	return (
		<DefaultLayout>
			<Head title='Đăng nhập' />
			<div className='container mx-auto w-10/12 bg-white'>
				<div className='flex min-h-full flex-1 flex-col justify-center lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						{/* logo */}
						{/* <img
							className='mx-auto h-10 w-auto'
							src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
							alt='Your Company'
						/> */}
						<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Đăng nhập
						</h2>
					</div>
					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form onSubmit={submit}>
							<div className='mb-2'>
								<label htmlFor='email' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
									Tài khoản
								</label>
								<div>
									<TextInput
										id='email'
										type='email'
										name='email'
										value={data.email}
										className={`${
											errors && errors.email ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
										autoComplete='username'
										isFocused={true}
										onChange={(e) => setData('email', e.target.value)}
									/>
									{errors && errors.email && <p className='text-sm italic text-red-500'>{errors.email}</p>}
								</div>
							</div>
							<div className='mb-2'>
								<div className='mb-2 flex items-center justify-between'>
									<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
										Mật khẩu
									</label>
									<div className='text-sm'>
										<Link
											href={route('password.request')}
											className='font-semibold text-orange-600 hover:text-orange-300'
										>
											Quên mật khẩu?
										</Link>
									</div>
								</div>
								<div className='mt-2'>
									<TextInput
										id='password'
										type='password'
										name='password'
										value={data.password}
										className={`${
											errors && errors.password ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
										autoComplete='current-password'
										onChange={(e) => setData('password', e.target.value)}
									/>
									{errors && errors.password && (
										<p className='text-sm italic text-red-500'>{errors.password}</p>
									)}
								</div>
								<div className='mt-2'>
									<label className='flex items-center'>
										<input
											name='remember'
											checked={data.remember}
											type='checkbox'
											onChange={(e) => setData('remember', e.target.checked)}
											className={'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 '}
										/>
										<span className='ml-2 text-sm text-gray-600'>Nhớ đến tôi</span>
									</label>
								</div>
							</div>
							<div className='mt-4'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
								>
									Đăng nhập
								</button>
							</div>
						</form>

						<p className='mt-10 text-center text-sm text-gray-500'>
							Bạn chưa đăng ký?{' '}
							<Link
								href='/register'
								className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
							>
								Đăng ký ngay tại đây
							</Link>
						</p>
						<hr />
						<p className='mt-3 text-center text-sm text-gray-500'>Hoặc đăng nhập bằng</p>
						<div className='flex '>
							{/* Nút đăng nhập bằng Facebook */}
							<button className='mx-2 mt-4 flex w-1/2 items-center justify-center rounded-md bg-blue-500 px-1 py-2 text-white shadow-md hover:bg-blue-600'>
								<FaFacebook className='mr-2' />
								Facebook
							</button>

							{/* Nút đăng nhập bằng Google */}
							<button className='mx-2 mt-4 flex w-1/2 items-center justify-center rounded-md bg-red-500 px-1 py-2 text-white shadow-md hover:bg-red-600'>
								<FaGoogle className='mr-2' />
								Google
							</button>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
